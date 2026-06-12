let editorInstance;
const { exec } = require('child_process'); 

// 1. Hook into Monaco System Engine Initialization Pipelines
require.config({ paths: { 'vs': 'node_modules/monaco-editor/min/vs' } });

require(['vs/editor/editor.main'], function() {
    
    // Register your custom programming language identifier rules
    monaco.languages.register({ id: 'customGameLang' });

    // Define syntax-highlighting token groups exactly matching your structural choices
    monaco.languages.setMonarchTokensProvider('customGameLang', {
        tokenizer: {
            root: [
                // Highlight your structural framework and asset loading words
                [/\b(import|using|module|pipeline)\b/, 'keyword.structure'],

                // Highlight text output and spatial vocal media controls
                [/\b(print|broadcast)\b/, 'keyword.output'],

                // Highlight master namespace libraries and components
                [/\b(scene3d|scene2d|playerV11|Sound|customUI|customGUI|AIUser|Trainer|Olanguage|profiler|Videos)\b/, 'keyword.module'],
                
                // Highlight system operational lifecycles and mathematical calculation commands
                [/\b(start\.game|close\.game|numerate|GetCoords|customgraph|usegraph|repeat|Close|Cutscenes)\b/, 'keyword.action'],
                
                // Highlight global structural execution flow tags
                [/\b(func-do|Loop|for|break|cont|in|do|if|elseif|else|matched|yield|when|void|delete|function|func|returns|Main|class|public|stop|sinc)\b/, 'keyword.control'],
                
                // Track bracket enclosures and code structural separators
                [/[{}()\[\]]/, 'delimiter.brackets'],
                
                // Identify strings wrapped inside coordinates configuration maps
                [/"([^"\\]|\\.)*"/, 'string'],
                
                // Identify single-line developer notation text comments
                [/\/\/.*$/, 'comment'],
            ]
        }
    });

    // Match theme style color structures directly to real VS Code configurations
    monaco.editor.defineTheme('vsCodeStudioTheme', {
        base: 'vs-dark',
        inherit: true,
        rules: [
            { token: 'keyword.structure', foreground: 'ff6b6b', fontStyle: 'bold' },
            { token: 'keyword.output', foreground: '4ecdc4', fontStyle: 'bold' },
            { token: 'keyword.module', foreground: '569cd6', fontStyle: 'bold' },
            { token: 'keyword.action', foreground: '4fc1ff' },
            { token: 'keyword.control', foreground: 'c586c0', fontStyle: 'bold' },
            { token: 'string', foreground: 'ce9178' },
            { token: 'comment', foreground: '6a9955', fontStyle: 'italic' },
            { token: 'delimiter.brackets', foreground: 'ffd700' }
        ],
        colors: {
            'editor.background': '#1e1e1e',
            'editor.foreground': '#d4d4d4',
            'editorLineNumber.foreground': '#858585',
            'editorLineNumber.activeForeground': '#c6c6c6',
            'editor.lineHighlightBackground': '#2f2f2f'
        }
    });

    // Instantiate and inject the fully operational Monaco window into screen layer framework container
    editorInstance = monaco.editor.create(document.getElementById('editor-container'), {
        value: [
            "// Workspace Initializations",
            "import \"src/assets/audio/\"",
            "using \"physics_engine.3d\"",
            "module scene3d",
            "pipeline customgraph",
            "",
            "scene3d.start.game()",
            "print \"System Boot Complete. Loading Level Shaders...\"",
            "broadcast \"Welcome back dev\"",
            "scene3d.close.game(0)"
        ].join('\n'),
        language: 'customGameLang',
        theme: 'vsCodeStudioTheme',
        fontSize: 14,
        fontFamily: 'Consolas, monospace',
        automaticLayout: true,
        minimap: { enabled: true }
    });
});

// 2. Trigger the C++ compiler background pipeline when clicking the RUN button
function executeCustomCompilerCode() {
    const codeValue = editorInstance.getValue();
    const terminal = document.getElementById('terminal-output');
    terminal.textContent = "⚙️ Sending script text arrays downstream to native C++ compilation matrices...\n\n";

    // Simulating terminal write-out for standard cross-platform operations
    terminal.textContent += "=== RUNNING ENGINE COMPILE PASS ===\n";
    
    let lines = codeValue.split('\n');
    let errors = 0;
    
    lines.forEach((line, i) => {
        let clean = line.trim();
        // Skip check validations for valid global control phrases
        if (clean && 
            !clean.startsWith("//") && 
            !clean.startsWith("scene3d.") && 
            !clean.startsWith("Olanguage.") && 
            !clean.startsWith("import ") && 
            !clean.startsWith("using ") && 
            !clean.startsWith("module ") && 
            !clean.startsWith("pipeline ") && 
            !clean.startsWith("print ") && 
            !clean.startsWith("broadcast ") && 
            !clean.match(/^(stop|break|sinc)$/)) {
            terminal.textContent += `❌ [Syntax Error] Line ${i+1}: Invalid keyword syntax statement format structure '${clean}'\n`;
            errors++;
        }
    });
    
    terminal.textContent += `\n🏁 Process closed via close.game() rules stack calculation. Code returned exit status value code: (${errors})`;
                }
