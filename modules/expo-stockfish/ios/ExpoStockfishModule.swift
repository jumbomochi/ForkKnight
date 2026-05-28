import ExpoModulesCore

public class ExpoStockfishModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoStockfish")

    Events("stockfish.line")

    AsyncFunction("start") {
      self.sendEvent("stockfish.line", ["line": "echo: started"])
    }

    Function("send") { (command: String) in
      self.sendEvent("stockfish.line", ["line": "echo: \(command)"])
    }

    AsyncFunction("stop") {
      self.sendEvent("stockfish.line", ["line": "echo: stopped"])
    }
  }
}
