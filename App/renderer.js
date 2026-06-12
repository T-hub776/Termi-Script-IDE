let editorInstance;

// 1. Hook into Monaco System Engine Initialization Pipelines
require.config({ paths: { 'vs': 'node_modules/monaco-editor/min/vs' } });

require(['vs/editor/editor.main'], function() {
    
    // Register your official Termi-Script identifier rules
    monaco.languages.register({ id: 'termiScript' });

    // Define syntax-highlighting token groups
    monaco.languages.setMonarchTokensProvider('termiScript', {
        tokenizer: {
            root: [
                [/\b(import|using|module|pipeline)\b/, 'keyword.structure'],
                [/\b(print|broadcast)\b/, 'keyword.output'],
                [/\b(scene3d|scene2d|playerV11|Sound|customUI|customGUI|AIUser|Trainer|Olanguage|profiler|Videos)\b/, 'keyword.module'],
                [/\b(start\.game|close\.game|numerate|GetCoords|customgraph|usegraph|repeat|Close|Cutscenes)\b/, 'keyword.action'],
                [/\b(func-do|Loop|for|break|cont|in|do|if|elseif|else|matched|yield|when|void|delete|function|func|returns|Main|class|public|stop|sinc)\b/, 'keyword.control'],
                [/[{}()\[\]]/, 'delimiter.brackets'],
                [/"([^"\\]|\\.)*"/, 'string'],
                [/\/\/.*$/, 'comment'],
            ]
        }
    });

    // Custom Color Palette Theme Settings
    monaco.editor.defineTheme('termiScriptStudioTheme', {
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
            'editor.background': '#1c1c1c',
            'editor.foreground': '#e1e1e1'
        }
    });

    // =================================================================
    // 🧠 BRAND NEW: TERMI-SCRIPT INTELLISENSE AUTOCOMPLETE & PREDICTION
    // =================================================================
    monaco.languages.registerCompletionItemProvider('termiScript', {
        provideCompletionItems: function(model, position) {
            const suggestions = [
                // Global Structure Commands
                {
                    label: 'import',
                    kind: monaco.languages.CompletionItemKind.Keyword,
                    insertText: 'import "${1:folder_path}/"',
                    insertTextRules: monaco.languages.CompletionItemInsertRule.InsertAsSnippet,
                    documentation: 'Termi-Script Workspace: Maps a full directory folder path into execution memory storage pools.'
                },
                {
                    label: 'using',
                    kind: monaco.languages.CompletionItemKind.Keyword,
                    insertText: 'using "${1:file_name.data}"',
                    insertTextRules: monaco.languages.CompletionItemInsertRule.InsertAsSnippet,
                    documentation: 'Termi-Script Asset: Establishes a static programmatic reference to an external logic asset or file node.'
                },
                {
                    label: 'print',
                    kind: monaco.languages.CompletionItemKind.Keyword,
                    insertText: 'print "${1:message}"',
                    insertTextRules: monaco.languages.CompletionItemInsertRule.InsertAsSnippet,
                    documentation: 'Termi-Script Console: Outputs text data tokens directly onto your IDE terminal output debug drawer.'
                },
                {
                    label: 'broadcast',
                    kind: monaco.languages.CompletionItemKind.Keyword,
                    insertText: 'broadcast "${1:vocal message}"',
                    insertTextRules: monaco.languages.CompletionItemInsertRule.InsertAsSnippet,
                    documentation: 'Termi-Script Sound: Commands the runtime soundboard to read out text using the hardware speech engine.'
                },

                // Module and Namespace Bindings
                {
                    label: 'scene3d',
                    kind: monaco.languages.CompletionItemKind.Module,
                    insertText: 'scene3d',
                    documentation: 'Termi-Script 3D Subsystem Core Package Namespace.'
                },
                {
                    label: 'playerV11',
                    kind: monaco.languages.CompletionItemKind.Module,
                    insertText: 'playerV11.play()',
                    documentation: 'Termi-Script Sound Engine: Decodes and streams background audio tracks directly out from memory.'
                },
                {
                    label: 'Trainer',
                    kind: monaco.languages.CompletionItemKind.Module,
                    insertText: 'Trainer.study()',
                    documentation: 'Termi-Script AI: Triggers deep backpropagation gradient calculations to optimize active network parameters.'
                },
                {
                    label: 'AIUser',
                    kind: monaco.languages.CompletionItemKind.Module,
                    insertText: 'AIUser.predict()',
                    documentation: 'Termi-Script AI: Evaluates current inference tracking paths for autonomous asset motion nodes.'
                },

                // Member Actions with Multi-dot Contexts
                {
                    label: 'scene3d.start.game',
                    kind: monaco.languages.CompletionItemKind.Method,
                    insertText: 'scene3d.start.game()',
                    documentation: 'Opens a new native OpenGL/Vulkan 3D viewport canvas runtime loop window.'
                },
                {
                    label: 'scene3d.close.game',
                    kind: monaco.languages.CompletionItemKind.Method,
                    insertText: 'scene3d.close.game(0)',
                    documentation: 'Halts script loops and reports compiled syntax error totals back to your GitHub IDE channel.'
                },
                {
                    label: 'scene3d.numerate',
                    kind: monaco.languages.CompletionItemKind.Method,
                    insertText: 'scene3d.numerate',
                    documentation: 'Calculates structural floating-point spatial coordinate transformations across active player meshes.'
                },

                // Advanced Code Snippet Templates
                {
                    label: 'customgraph-block',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    // Generates your multi-bracket code layout block automatically!
                    insertText: [
                        'scene3d.customgraph[{',
                        '\t(${1:vec3 position}) {',
                        '\t\t// Type custom layout shader instructions here',
                        '\t\t$0',
                        '\t}',
                        '}]'
                    ].join('\n'),
                    insertTextRules: monaco.languages.CompletionItemInsertRule.InsertAsSnippet,
                    documentation: 'Termi-Script Template Snippet: Injects a complete custom graph bracket rendering template block.'
                },
                {
                    label: 'func-do-async',
                    kind: monaco.languages.CompletionItemKind.Snippet,
                    insertText: 'func-do ${1:function_one()} ${2:function_two()}',
                    insertTextRules: monaco.languages.CompletionItemInsertRule.InsertAsSnippet,
                    documentation: 'Termi-Script Concurrency: Automatically schedules two target functions to run asynchronously in parallel without any tick delays.'
                }
            ];

            return { suggestions: suggestions };
        }
    });

    // Instantiate your customized Monaco space framework 
    editorInstance = monaco.editor.create(document.getElementById('editor-container'), {
        value: [
            "// Official Termi-Script v1.0 Blueprint Script Template",
            "import \"src/assets/clips/\"",
            "using \"character.mesh\"",
            "module scene3d",
            "pipeline customgraph",
            "",
            "scene3d.start.game()",
            "print \"Termi-Script Environment Active.\"",
            "broadcast \"System initialized running version 1.0\"",
            "scene3d.close.game(0)"
        ].join('\n'),
        language: 'termiScript',
        theme: 'termiScriptStudioTheme',
        fontSize: 14,
        fontFamily: 'Consolas, monospace',
        automaticLayout: true,
        minimap: { enabled: true },
        
        // Ensure autocompletion popups display fluidly as you type
        quickSuggestions: { other: true, comments: false, strings: false },
        suggestOnTriggerCharacters: true // Populates options when developers press structural punctuation like dot '.'
    });
});
