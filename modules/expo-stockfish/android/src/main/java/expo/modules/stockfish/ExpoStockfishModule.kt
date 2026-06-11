package expo.modules.stockfish

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoStockfishModule : Module() {
  companion object {
    init { System.loadLibrary("expo_stockfish") }
  }

  private external fun nativeStart()
  private external fun nativeSend(command: String)
  private external fun nativeStop()

  // Called from JNI on the reader thread.
  @Suppress("unused")
  fun emitLine(line: String) {
    sendEvent("stockfish.line", mapOf("line" to line))
  }

  override fun definition() = ModuleDefinition {
    Name("ExpoStockfish")

    Events("stockfish.line")

    AsyncFunction("start") { nativeStart() }
    Function("send") { command: String -> nativeSend(command) }
    AsyncFunction("stop") { nativeStop() }
  }
}
