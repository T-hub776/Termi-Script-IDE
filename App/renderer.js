let editorInstance;

require.config({ paths: { 'vs': 'node_modules/monaco-editor/min/vs' } });

require(['vs/editor/editor.main'], function() {
    
    // Register your official new language name token identifier
    monaco.languages.register({ id: 'termiScript' });

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
        minimap: { enabled: true }
    });
});
