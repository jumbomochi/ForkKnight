import { requireNativeModule, NativeModule } from "expo-modules-core";

type StockfishEventsMap = {
  "stockfish.line": (event: { line: string }) => void;
};

declare class ExpoStockfishNative extends NativeModule<StockfishEventsMap> {
  start(): Promise<void>;
  send(command: string): void;
  stop(): Promise<void>;
}

const native = requireNativeModule<ExpoStockfishNative>("ExpoStockfish");

export type LineListener = (event: { line: string }) => void;

export function start(): Promise<void> {
  return native.start();
}

export function send(command: string): void {
  native.send(command);
}

export function stop(): Promise<void> {
  return native.stop();
}

export function onLine(listener: LineListener): { remove: () => void } {
  return native.addListener("stockfish.line", listener);
}
