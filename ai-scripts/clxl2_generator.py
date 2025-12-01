#!/usr/bin/env python3
"""
CLxL2 AI Script Generator
Uses Ollama with CodeLlama and Llama2 models to generate scripts
"""

import subprocess
import json
import sys
import os
from datetime import datetime

class CLxL2:
    """Interface for CodeLlama-13B and Llama2-13B via Ollama"""
    
    def __init__(self):
        self.codellama = "codellama:13b"
        self.llama2 = "llama2:13b"
    
    def query_codellama(self, prompt):
        """Query CodeLlama for code generation"""
        try:
            result = subprocess.run(
                ["ollama", "run", self.codellama, prompt],
                capture_output=True,
                text=True,
                timeout=60
            )
            return result.stdout.strip()
        except Exception as e:
            return f"Error querying CodeLlama: {e}"
    
    def query_llama2(self, prompt):
        """Query Llama2 for general AI tasks"""
        try:
            result = subprocess.run(
                ["ollama", "run", self.llama2, prompt],
                capture_output=True,
                text=True,
                timeout=60
            )
            return result.stdout.strip()
        except Exception as e:
            return f"Error querying Llama2: {e}"
    
    def generate_script(self, description, language="python"):
        """Generate a script based on description"""
        prompt = f"""Generate a complete, functional {language} script for the following task:

{description}

Requirements:
- Include proper error handling
- Add helpful comments
- Make it production-ready
- Include usage examples in comments

Only output the code, no explanations."""

        print(f"🤖 CLxL2 generating {language} script...")
        code = self.query_codellama(prompt)
        return code
    
    def improve_script(self, script_path):
        """Use both models to improve an existing script"""
        with open(script_path, 'r') as f:
            original = f.read()
        
        # CodeLlama for code improvements
        code_prompt = f"""Improve this code for better performance, readability, and error handling:

{original}

Return only the improved code."""
        
        print("🔧 CodeLlama analyzing code...")
        improved = self.query_codellama(code_prompt)
        
        return improved
    
    def explain_script(self, script_path):
        """Use Llama2 to explain what a script does"""
        with open(script_path, 'r') as f:
            code = f.read()
        
        prompt = f"""Explain what this script does in simple terms:

{code}

Provide a clear, concise explanation."""
        
        print("📖 Llama2 analyzing script...")
        explanation = self.query_llama2(prompt)
        return explanation


def main():
    if len(sys.argv) < 2:
        print("CLxL2 AI Script Generator")
        print("\nUsage:")
        print("  python3 clxl2_generator.py generate <description>")
        print("  python3 clxl2_generator.py improve <script_path>")
        print("  python3 clxl2_generator.py explain <script_path>")
        print("\nExamples:")
        print("  python3 clxl2_generator.py generate 'Create a GPIO monitor for Raspberry Pi'")
        print("  python3 clxl2_generator.py improve my_script.py")
        print("  python3 clxl2_generator.py explain my_script.py")
        sys.exit(1)
    
    ai = CLxL2()
    command = sys.argv[1]
    
    if command == "generate":
        if len(sys.argv) < 3:
            print("Error: Please provide a description")
            sys.exit(1)
        
        description = " ".join(sys.argv[2:])
        code = ai.generate_script(description)
        
        # Save generated script
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        filename = f"generated_{timestamp}.py"
        filepath = f"/home/chyort/projects/ai-scripts/{filename}"
        
        with open(filepath, 'w') as f:
            f.write(code)
        
        print(f"\n✅ Script saved to: {filepath}")
        print(f"\n{code}")
    
    elif command == "improve":
        if len(sys.argv) < 3:
            print("Error: Please provide a script path")
            sys.exit(1)
        
        script_path = sys.argv[2]
        improved = ai.improve_script(script_path)
        
        # Save improved version
        base = os.path.splitext(script_path)[0]
        ext = os.path.splitext(script_path)[1]
        improved_path = f"{base}_improved{ext}"
        
        with open(improved_path, 'w') as f:
            f.write(improved)
        
        print(f"\n✅ Improved script saved to: {improved_path}")
    
    elif command == "explain":
        if len(sys.argv) < 3:
            print("Error: Please provide a script path")
            sys.exit(1)
        
        script_path = sys.argv[2]
        explanation = ai.explain_script(script_path)
        
        print(f"\n📖 Explanation:\n{explanation}")
    
    else:
        print(f"Unknown command: {command}")
        sys.exit(1)


if __name__ == "__main__":
    main()
