#!/bin/bash
# CLxL2 Bash Script Generator
# Quick script generation using Ollama models

CODELLAMA="codellama:13b"
LLAMA2="llama2:13b"
OUTPUT_DIR="/home/chyort/projects/ai-scripts"

generate_bash_script() {
    local description="$1"
    local timestamp=$(date +%Y%m%d_%H%M%S)
    local output_file="${OUTPUT_DIR}/generated_${timestamp}.sh"
    
    echo "🤖 CLxL2 generating bash script..."
    
    local prompt="Generate a complete, functional bash script for: ${description}

Requirements:
- Include shebang (#!/bin/bash)
- Add error handling (set -e)
- Include comments
- Make it executable-ready

Output only the script code, no explanations."

    ollama run "$CODELLAMA" "$prompt" > "$output_file"
    
    chmod +x "$output_file"
    echo "✅ Script saved to: $output_file"
    echo "📄 Content:"
    cat "$output_file"
}

generate_python_script() {
    local description="$1"
    local timestamp=$(date +%Y%m%d_%H%M%S)
    local output_file="${OUTPUT_DIR}/generated_${timestamp}.py"
    
    echo "🤖 CLxL2 generating Python script..."
    
    local prompt="Generate a complete, functional Python script for: ${description}

Requirements:
- Include shebang (#!/usr/bin/env python3)
- Add error handling
- Include docstrings
- Make it production-ready

Output only the script code, no explanations."

    ollama run "$CODELLAMA" "$prompt" > "$output_file"
    
    chmod +x "$output_file"
    echo "✅ Script saved to: $output_file"
    echo "📄 Content:"
    cat "$output_file"
}

ask_clxl2() {
    local question="$1"
    echo "💬 CLxL2 responding..."
    ollama run "$LLAMA2" "$question"
}

code_review() {
    local file="$1"
    
    if [[ ! -f "$file" ]]; then
        echo "Error: File not found: $file"
        exit 1
    fi
    
    echo "🔍 CLxL2 reviewing code..."
    
    local code=$(cat "$file")
    local prompt="Review this code and suggest improvements:

${code}

Provide specific suggestions for:
1. Performance
2. Security
3. Error handling
4. Code quality"

    ollama run "$CODELLAMA" "$prompt"
}

# Main script
case "${1:-}" in
    bash)
        if [[ -z "${2:-}" ]]; then
            echo "Usage: $0 bash <description>"
            exit 1
        fi
        generate_bash_script "${@:2}"
        ;;
    
    python)
        if [[ -z "${2:-}" ]]; then
            echo "Usage: $0 python <description>"
            exit 1
        fi
        generate_python_script "${@:2}"
        ;;
    
    ask)
        if [[ -z "${2:-}" ]]; then
            echo "Usage: $0 ask <question>"
            exit 1
        fi
        ask_clxl2 "${@:2}"
        ;;
    
    review)
        if [[ -z "${2:-}" ]]; then
            echo "Usage: $0 review <file>"
            exit 1
        fi
        code_review "$2"
        ;;
    
    *)
        echo "CLxL2 AI Script Generator (Bash Edition)"
        echo ""
        echo "Usage:"
        echo "  $0 bash <description>     - Generate bash script"
        echo "  $0 python <description>   - Generate Python script"
        echo "  $0 ask <question>         - Ask CLxL2 a question"
        echo "  $0 review <file>          - Code review with CLxL2"
        echo ""
        echo "Examples:"
        echo "  $0 bash 'Monitor system resources and alert on high usage'"
        echo "  $0 python 'Parse JSON logs and extract errors'"
        echo "  $0 ask 'How do I optimize this Raspberry Pi for performance?'"
        echo "  $0 review my_script.sh"
        exit 1
        ;;
esac
