import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { ChessBoard } from "@/components/board";
import { Button } from "@/components/common";
import { createChessEngine } from "@/services/chess";
import { colors, spacing, fontSize, fontWeight, borderRadius } from "@/utils/theme";
import type { Lesson, LessonStep, Square } from "@/types";

interface LessonViewerProps {
  lesson: Lesson;
  onComplete: () => void;
  onExit: () => void;
}

// Status banner component
function StatusBanner({ type, quizAnswered }: { type: LessonStep["type"]; quizAnswered: boolean }) {
  const isInteractive = type === "exercise" && !quizAnswered;

  const getStatusConfig = () => {
    if (type === "exercise") {
      if (quizAnswered) {
        return {
          text: "Completed",
          icon: "✓",
          backgroundColor: colors.success,
          textColor: colors.textInverse,
        };
      }
      return {
        text: "Your Turn - Make a Move!",
        icon: "♟",
        backgroundColor: "#4CAF50",
        textColor: "#FFFFFF",
      };
    }
    if (type === "quiz") {
      if (quizAnswered) {
        return {
          text: "Completed",
          icon: "✓",
          backgroundColor: colors.success,
          textColor: colors.textInverse,
        };
      }
      return {
        text: "Answer the Question",
        icon: "?",
        backgroundColor: colors.primary,
        textColor: colors.textInverse,
      };
    }
    if (type === "demonstration") {
      return {
        text: "Watch & Learn",
        icon: "👁",
        backgroundColor: colors.secondary,
        textColor: colors.text,
      };
    }
    // explanation
    return {
      text: "Read & Learn",
      icon: "📖",
      backgroundColor: colors.surface,
      textColor: colors.text,
    };
  };

  const config = getStatusConfig();

  return (
    <View style={[styles.statusBanner, { backgroundColor: config.backgroundColor }]}>
      <Text style={[styles.statusIcon]}>{config.icon}</Text>
      <Text style={[styles.statusText, { color: config.textColor }]}>{config.text}</Text>
    </View>
  );
}

// Pagination dots component
function PaginationDots({
  total,
  current,
  onDotPress,
  steps,
}: {
  total: number;
  current: number;
  onDotPress: (index: number) => void;
  steps: LessonStep[];
}) {
  const getStepColor = (step: LessonStep) => {
    switch (step.type) {
      case "exercise":
        return "#4CAF50"; // Green for exercises
      case "quiz":
        return colors.primary; // Primary for quizzes
      case "demonstration":
        return colors.secondary; // Secondary for demos
      default:
        return colors.border; // Default for explanations
    }
  };

  return (
    <View style={styles.paginationContainer}>
      {steps.map((step, index) => (
        <Pressable
          key={index}
          onPress={() => onDotPress(index)}
          style={styles.dotPressable}
        >
          <View
            style={[
              styles.dot,
              {
                backgroundColor: index === current ? getStepColor(step) : colors.border,
                transform: [{ scale: index === current ? 1.3 : 1 }],
              },
              index <= current && styles.dotCompleted,
            ]}
          />
          {step.type === "exercise" && (
            <View style={styles.exerciseIndicator} />
          )}
        </Pressable>
      ))}
    </View>
  );
}

export function LessonViewer({ lesson, onComplete, onExit }: LessonViewerProps) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [engine] = useState(() => createChessEngine());
  const [positions, setPositions] = useState(engine.getBoard());
  const [selectedSquare, setSelectedSquare] = useState<Square | null>(null);
  const [lastMove, setLastMove] = useState<{ from: Square; to: Square } | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackType, setFeedbackType] = useState<"success" | "error" | "hint">("hint");
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<string | null>(null);
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [hintIndex, setHintIndex] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const currentStep = lesson.steps[currentStepIndex];
  const isLastStep = currentStepIndex === lesson.steps.length - 1;

  useEffect(() => {
    if (currentStep?.fen) {
      engine.loadFen(currentStep.fen);
      setPositions(engine.getBoard());
    }
    setSelectedSquare(null);
    setLastMove(null);
    setFeedback(null);
    setSelectedQuizAnswer(null);
    setQuizAnswered(completedSteps.has(currentStepIndex));
    setHintIndex(0);
  }, [currentStepIndex, currentStep?.fen, engine, completedSteps]);

  const tryMove = useCallback(
    (from: Square, to: Square) => {
      if (currentStep?.type !== "exercise") return false;
      if (quizAnswered) return false;

      const move = engine.makeMove({ from, to });

      if (move) {
        const moveUci = `${move.from}${move.to}`;
        setPositions(engine.getBoard());
        setLastMove({ from, to });

        if (currentStep.correctAnswer === moveUci) {
          setFeedback("Correct! Well done!");
          setFeedbackType("success");
          setQuizAnswered(true);
          setCompletedSteps((prev) => new Set(prev).add(currentStepIndex));
        } else {
          engine.undoMove();
          setPositions(engine.getBoard());
          setLastMove(null);
          setFeedback("Not quite right. Try again!");
          setFeedbackType("error");
        }
        return true;
      }
      return false;
    },
    [engine, currentStep, quizAnswered, currentStepIndex]
  );

  const handleSquarePress = useCallback(
    (square: Square) => {
      if (currentStep?.type !== "exercise") return;
      if (quizAnswered) return;

      const piece = positions.find((p) => p.square === square);

      if (selectedSquare) {
        tryMove(selectedSquare, square);
        setSelectedSquare(null);
      } else if (piece && piece.color === engine.turn()) {
        setSelectedSquare(square);
      }
    },
    [selectedSquare, positions, engine, currentStep, quizAnswered, tryMove]
  );

  const handlePieceDrop = useCallback(
    (from: Square, to: Square) => {
      if (currentStep?.type !== "exercise") return;
      if (quizAnswered) return;

      // Verify the piece being moved is the correct color
      const piece = positions.find((p) => p.square === from);
      if (!piece || piece.color !== engine.turn()) return;

      tryMove(from, to);
      setSelectedSquare(null);
    },
    [engine, positions, currentStep, quizAnswered, tryMove]
  );

  const handleQuizAnswer = (answerId: string) => {
    if (quizAnswered) return;
    setSelectedQuizAnswer(answerId);

    const selectedOption = currentStep?.options?.find((o) => o.id === answerId);
    if (selectedOption?.isCorrect) {
      setFeedback("Correct!");
      setFeedbackType("success");
      setCompletedSteps((prev) => new Set(prev).add(currentStepIndex));
    } else {
      setFeedback("Not quite. The correct answer is highlighted.");
      setFeedbackType("error");
    }
    setQuizAnswered(true);
  };

  const handleHint = () => {
    if (currentStep?.hints && hintIndex < currentStep.hints.length) {
      const hint = currentStep.hints[hintIndex];
      if (hint) {
        setFeedback(hint);
        setFeedbackType("hint");
        setHintIndex((prev) => prev + 1);
      }
    }
  };

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const handleDotPress = (index: number) => {
    // Allow navigation to any step (for flexibility during learning)
    setCurrentStepIndex(index);
  };

  const getHighlightedSquares = useCallback((): Square[] => {
    if (!selectedSquare || currentStep?.type !== "exercise") return [];
    return engine.getLegalMoves(selectedSquare).map((move) => move.to as Square);
  }, [selectedSquare, engine, currentStep?.type]);

  const canProceed = (): boolean => {
    if (!currentStep) return false;
    if (currentStep.type === "exercise" || currentStep.type === "quiz") {
      return quizAnswered && feedbackType === "success";
    }
    return true;
  };

  const renderStepContent = () => {
    if (!currentStep) return null;

    switch (currentStep.type) {
      case "explanation":
      case "demonstration":
        return (
          <View style={styles.explanationContainer}>
            {currentStep.title && (
              <Text style={styles.stepTitle}>{currentStep.title}</Text>
            )}
            <Text style={styles.stepContent}>{currentStep.content}</Text>
          </View>
        );

      case "exercise":
        return (
          <View style={styles.exerciseContainer}>
            {currentStep.title && (
              <Text style={styles.stepTitle}>{currentStep.title}</Text>
            )}
            <Text style={styles.stepContent}>{currentStep.content}</Text>
            {!quizAnswered && currentStep.hints && hintIndex < currentStep.hints.length && (
              <Button
                title={`Hint (${hintIndex + 1}/${currentStep.hints.length})`}
                onPress={handleHint}
                variant="outline"
                size="small"
                style={styles.hintButton}
              />
            )}
          </View>
        );

      case "quiz":
        return (
          <View style={styles.quizContainer}>
            {currentStep.title && (
              <Text style={styles.stepTitle}>{currentStep.title}</Text>
            )}
            <Text style={styles.stepContent}>{currentStep.content}</Text>
            <View style={styles.quizOptions}>
              {currentStep.options?.map((option) => {
                const isSelected = selectedQuizAnswer === option.id;
                const showCorrect = quizAnswered && option.isCorrect;
                const showWrong = quizAnswered && isSelected && !option.isCorrect;

                return (
                  <Button
                    key={option.id}
                    title={option.text}
                    onPress={() => handleQuizAnswer(option.id)}
                    variant={showCorrect ? "primary" : showWrong ? "secondary" : "outline"}
                    style={
                      showCorrect
                        ? { ...styles.quizOption, ...styles.correctOption }
                        : showWrong
                          ? { ...styles.quizOption, ...styles.wrongOption }
                          : styles.quizOption
                    }
                    disabled={quizAnswered}
                  />
                );
              })}
            </View>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button title="Exit" onPress={onExit} variant="ghost" size="small" />
        <Text style={styles.progress}>
          {currentStepIndex + 1} / {lesson.steps.length}
        </Text>
      </View>

      {/* Pagination dots */}
      <PaginationDots
        total={lesson.steps.length}
        current={currentStepIndex}
        onDotPress={handleDotPress}
        steps={lesson.steps}
      />

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.lessonTitle}>{lesson.title}</Text>

        {currentStep?.fen && (
          <View style={styles.boardSection}>
            {/* Status banner above the board */}
            <StatusBanner type={currentStep.type} quizAnswered={quizAnswered} />

            <View style={styles.boardContainer}>
              <ChessBoard
                positions={positions}
                selectedSquare={selectedSquare}
                highlightedSquares={getHighlightedSquares()}
                lastMove={lastMove}
                onSquarePress={handleSquarePress}
                onPieceDrop={handlePieceDrop}
                interactive={currentStep.type === "exercise" && !quizAnswered}
              />
            </View>
          </View>
        )}

        {renderStepContent()}

        {feedback && (
          <View
            style={[
              styles.feedbackBox,
              feedbackType === "success" && styles.successFeedback,
              feedbackType === "error" && styles.errorFeedback,
              feedbackType === "hint" && styles.hintFeedback,
            ]}
          >
            <Text
              style={[
                styles.feedbackText,
                feedbackType === "success" && styles.successText,
                feedbackType === "error" && styles.errorText,
              ]}
            >
              {feedback}
            </Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.navigation}>
        <Button
          title="Previous"
          onPress={handlePrevious}
          variant="outline"
          disabled={currentStepIndex === 0}
          style={styles.navButton}
        />
        <Button
          title={isLastStep ? "Complete" : "Next"}
          onPress={handleNext}
          disabled={!canProceed()}
          style={styles.navButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  progress: {
    fontSize: fontSize.sm,
    color: colors.textLight,
    fontWeight: fontWeight.medium,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  dotPressable: {
    padding: spacing.xs,
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
  },
  dotCompleted: {
    opacity: 1,
  },
  exerciseIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#4CAF50",
    marginTop: 2,
  },
  content: {
    padding: spacing.lg,
    alignItems: "center",
  },
  lessonTitle: {
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    color: colors.text,
    marginBottom: spacing.lg,
    textAlign: "center",
  },
  boardSection: {
    marginBottom: spacing.lg,
    alignItems: "center",
  },
  statusBanner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderTopLeftRadius: borderRadius.md,
    borderTopRightRadius: borderRadius.md,
    minWidth: 200,
  },
  statusIcon: {
    fontSize: fontSize.lg,
    marginRight: spacing.sm,
  },
  statusText: {
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
  boardContainer: {
    borderWidth: 2,
    borderTopWidth: 0,
    borderColor: colors.border,
    borderBottomLeftRadius: borderRadius.md,
    borderBottomRightRadius: borderRadius.md,
    overflow: "hidden",
  },
  explanationContainer: {
    width: "100%",
  },
  exerciseContainer: {
    width: "100%",
  },
  quizContainer: {
    width: "100%",
  },
  stepTitle: {
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    color: colors.text,
    marginBottom: spacing.sm,
  },
  stepContent: {
    fontSize: fontSize.md,
    color: colors.text,
    lineHeight: 24,
    marginBottom: spacing.md,
  },
  hintButton: {
    alignSelf: "flex-start",
  },
  quizOptions: {
    marginTop: spacing.md,
  },
  quizOption: {
    marginBottom: spacing.sm,
  },
  correctOption: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  wrongOption: {
    backgroundColor: colors.error,
    borderColor: colors.error,
  },
  feedbackBox: {
    padding: spacing.md,
    borderRadius: borderRadius.md,
    width: "100%",
    marginTop: spacing.md,
  },
  successFeedback: {
    backgroundColor: colors.success,
  },
  errorFeedback: {
    backgroundColor: colors.error,
  },
  hintFeedback: {
    backgroundColor: colors.secondary,
  },
  feedbackText: {
    fontSize: fontSize.md,
    textAlign: "center",
  },
  successText: {
    color: colors.textInverse,
    fontWeight: fontWeight.semibold,
  },
  errorText: {
    color: colors.textInverse,
  },
  navigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  navButton: {
    flex: 1,
    marginHorizontal: spacing.sm,
  },
});
