import ExpoModulesCore

public class ExpoStockfishModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoStockfish")

    Events("stockfish.line")

    AsyncFunction("start") { [weak self] in
      StockfishBridge.shared().start { [weak self] line in
        self?.sendEvent("stockfish.line", ["line": line])
      }
    }

    Function("send") { (command: String) in
      StockfishBridge.shared().send(command)
    }

    AsyncFunction("stop") {
      StockfishBridge.shared().stop()
    }
  }
}
