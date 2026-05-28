package expo.modules.stockfish

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoStockfishModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("ExpoStockfish")

    Events("stockfish.line")

    AsyncFunction("start") {
      sendEvent("stockfish.line", mapOf("line" to "echo: started"))
    }

    Function("send") { command: String ->
      sendEvent("stockfish.line", mapOf("line" to "echo: $command"))
    }

    AsyncFunction("stop") {
      sendEvent("stockfish.line", mapOf("line" to "echo: stopped"))
    }
  }
}
