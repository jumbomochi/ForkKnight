import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
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
    setQuizAnswered(false);
    setHintIndex(0);
  }, [currentStepIndex, currentStep?.fen, engine]);

  const handleSquarePress = useCallback(
    (square: Square) => {
      if (currentStep?.type !== "exercise") return;
      if (quizAnswered) return;

      const piece = positions.find((p) => p.square === square);

      if (selectedSquare) {
        const move = engine.makeMove({ from: selectedSquare, to: square });

        if (move) {
          const moveUci = `${move.from}${move.to}`;
          setPositions(engine.getBoard());
          setLastMove({ from: selectedSquare, to: square });

          if (currentStep.correctAnswer === moveUci) {
            setFeedback("Correct! Well done!");
            setFeedbackType("success");
            setQuizAnswered(true);
          } else {
            engine.undoMove();
            setPositions(engine.getBoard());
            setLastMove(null);
            setFeedback("Not quite right. Try again!");
            setFeedbackType("error");
          }
        }
        setSelectedSquare(null);
      } else if (piece && piece.color === engine.turn()) {
        setSelectedSquare(square);
      }
    },
    [selectedSquare, positions, engine, currentStep, quizAnswered]
  );

  const handleQuizAnswer = (answerId: string) => {
    if (quizAnswered) return;
    setSelectedQuizAnswer(answerId);

    const selectedOption = currentStep?.options?.find((o) => o.id === answerId);
    if (selectedOption?.isCorrect) {
      setFeedback("Correct!");
      setFeedbackType("success");
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

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.lessonTitle}>{lesson.title}</Text>

        {currentStep?.fen && (
          <View style={styles.boardContainer}>
            <ChessBoard
              positions={positions}
              selectedSquare={selectedSquare}
              highlightedSquares={getHighlightedSquares()}
              lastMove={lastMove}
              onSquarePress={handleSquarePress}
              interactive={currentStep.type === "exercise" && !quizAnswered}
            />
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
  boardContainer: {
    marginBottom: spacing.lg,
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
