#include <iostream>
#include <fstream>
#include <string>
#include <vector>
#include <regex>
#include <cstdlib>

std::string trim(const std::string& str) {
    size_t first = str.find_first_not_of(" \t\r\n");
    if (first == std::string::npos) return "";
    size_t last = str.find_last_not_of(" \t\r\n");
    return str.substr(first, (last - first + 1));
}

int main(int argc, char* argv[]) {
    if (argc < 2) {
        std::cout << "❌ [Engine Error] No script file path was passed to the compiler process.\n";
        return 1;
    }

    std::string filename = argv[1];
    std::ifstream file(filename);
    
    if (!file.is_open()) {
        std::cout << "❌ [IO Error] Failed to open source code file text stream: " << filename << "\n";
        return 1;
    }

    std::cout << "=== 🚀 INITIALIZING NATIVE C++ RUNTIME GAME ENGINE COMPILER ===\n";

    std::string line;
    int line_number = 0;
    int error_count = 0;
    bool system_terminated = false;

    while (std::getline(file, line)) {
        line_number++;
        std::string clean_line = trim(line);

        if (clean_line.empty() || clean_line.rfind("//", 0) == 0) {
            continue;
        }

        // --- NEW GLOBAL KEYWORD HANDLERS ---
        if (clean_line.rfind("import ", 0) == 0) {
            std::cout << "[" << line_number << "] 📂 Workspace: Importing complete folder directory structure asset map.\n";
        }
        else if (clean_line.rfind("using ", 0) == 0) {
            std::cout << "[" << line_number << "] 📄 Asset: Attaching single file logic script reference node.\n";
        }
        else if (clean_line.rfind("module ", 0) == 0) {
            std::cout << "[" << line_number << "] 🗂️ Registry: Activating module framework reference libraries.\n";
        }
        else if (clean_line.rfind("pipeline ", 0) == 0) {
            std::cout << "[" << line_number << "] ⚙️ Pipeline: Running high-performance structural processing pass optimizations.\n";
        }
        else if (clean_line.rfind("print ", 0) == 0) {
            std::smatch match;
            std::regex expr("print\\s+\"(.*?)\"");
            if (std::regex_search(clean_line, match, expr)) {
                std::cout << "📟 [Console Print Output]: " << match[1] << "\n";
            } else {
                std::cout << "❌ [Syntax Error] Line " << line_number << ": Print statement requires valid surrounding string quotation marks.\n";
                error_count++;
            }
        }
        else if (clean_line.rfind("broadcast ", 0) == 0) {
            std::smatch match;
            std::regex expr("broadcast\\s+\"(.*?)\"");
            if (std::regex_search(clean_line, match, expr)) {
                std::cout << "🔊 [TTS Voice Broadcast Layer]: Speaking phrase aloud -> \"" << match[1] << "\"\n";
            } else {
                std::cout << "❌ [Syntax Error] Line " << line_number << ": Broadcast syntax requires wrapping text inside quotation structures.\n";
                error_count++;
            }
        }

        // --- MODULE SCENE3D HANDLERS ---
        else if (clean_line == "scene3d.start.game()") {
            std::cout << "[" << line_number << "] 🎮 Engine: Initializing low-level C++ 3D graphics canvas buffers.\n";
        }
        else if (clean_line.rfind("scene3d.close.game(", 0) == 0) {
            std::cout << "\n[" << line_number << "] 🛑 Engine: Termination request received.\n";
            std::cout << "🔍 Analyzing compiler tracking stack logs... Found " << error_count << " broken lines.\n";
            std::cout << "🏁 System halting. Returning exit code integer value: (" << error_count << ")\n";
            system_terminated = true;
            file.close();
            return error_count;
        }
        else if (clean_line == "scene3d.Close") {
            std::cout << "[" << line_number << "] ❌ Engine: Executing immediate target function shutdown pattern.\n";
        }
        else if (clean_line == "scene3d.numerate") {
            std::cout << "[" << line_number << "] 🧮 Math: High-accuracy spatial matrices calculated.\n";
        }
        else if (clean_line.rfind("scene3d.customgraph", 0) == 0) {
            if (clean_line.find('[') != std::string::npos && clean_line.find('{') != std::string::npos && clean_line.find('(') != std::string::npos) {
                std::cout << "[" << line_number << "] 🎨 CustomGraph: Processing structural user shader block.\n";
            } else {
                std::cout << "❌ [Syntax Error] Line " << line_number << ": customgraph requires grouping pairs [], {}, and ().\n";
                error_count++;
            }
        }

        // --- CORE UNKNOWN FALLTHROUGH ---
        else {
            std::cout << "❌ [Syntax Error] Line " << line_number << ": Unrecognized statement expression pattern '" << clean_line << "'\n";
            error_count++;
        }
    }

    file.close();
    return error_count;
}
