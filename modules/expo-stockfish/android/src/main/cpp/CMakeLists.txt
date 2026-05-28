cmake_minimum_required(VERSION 3.22)
project(expo_stockfish CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
add_compile_options(-O3 -fno-exceptions -fno-rtti -DNDEBUG -DIS_64BIT -DUSE_POPCNT)

set(STOCKFISH_DIR ${CMAKE_CURRENT_SOURCE_DIR}/../../../../cpp/stockfish)

file(GLOB_RECURSE STOCKFISH_SOURCES CONFIGURE_DEPENDS
  ${STOCKFISH_DIR}/*.cpp
)
list(FILTER STOCKFISH_SOURCES EXCLUDE REGEX "${STOCKFISH_DIR}/main\\.cpp$")
list(FILTER STOCKFISH_SOURCES EXCLUDE REGEX "${STOCKFISH_DIR}/syzygy/.*")

add_library(expo_stockfish SHARED
  stockfish_jni.cpp
  stockfish_entry.cpp
  ${STOCKFISH_SOURCES}
)

target_include_directories(expo_stockfish PRIVATE ${STOCKFISH_DIR})

find_library(log-lib log)
target_link_libraries(expo_stockfish ${log-lib})
