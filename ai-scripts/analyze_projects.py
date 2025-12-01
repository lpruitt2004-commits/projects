#!/usr/bin/env python3
"""
CLxL2 Project Analyzer
Uses both Llama2 and CodeLlama to analyze and improve the entire projects folder
"""

import subprocess
import os
import json
from pathlib import Path

def query_llama2(prompt):
    """Ask Llama2 for analysis and recommendations"""
    try:
        result = subprocess.run(
            ["ollama", "run", "llama2:13b", prompt],
            capture_output=True,
            text=True,
            timeout=120
        )
        return result.stdout.strip()
    except Exception as e:
        return f"Error: {e}"

def query_codellama(prompt):
    """Ask CodeLlama for code analysis"""
    try:
        result = subprocess.run(
            ["ollama", "run", "codellama:13b", prompt],
            capture_output=True,
            text=True,
            timeout=120
        )
        return result.stdout.strip()
    except Exception as e:
        return f"Error: {e}"

def analyze_project_structure():
    """Have Llama2 analyze the overall project structure"""
    print("🤖 Llama2: Analyzing project structure...")
    
    structure = """
    /home/chyort/projects/
    ├── ai-scripts/          - CLxL2 AI script generator tools
    ├── raspi5Kit/          - React PWA for Raspberry Pi 5 (Fallout 76 style)
    └── learnToCodePortfolio/ - Learning materials and curriculum
    """
    
    prompt = f"""Analyze this project structure and provide:
1. Overall assessment of organization
2. Suggestions for improvement
3. Best practices recommendations
4. Any missing components

Project structure:
{structure}

Keep response concise and actionable."""

    return query_llama2(prompt)

def analyze_raspi5kit_code():
    """Have CodeLlama analyze the React PWA code"""
    print("🔍 CodeLlama: Analyzing raspi5Kit React code...")
    
    # Read a sample component
    try:
        with open('/home/chyort/projects/raspi5Kit/src/App.jsx', 'r') as f:
            app_code = f.read()[:2000]  # First 2000 chars
    except:
        app_code = "Unable to read file"
    
    prompt = f"""Review this React code for:
1. Code quality and best practices
2. Performance issues
3. Security concerns
4. Improvement suggestions

Code sample:
{app_code}

Provide specific, actionable recommendations."""

    return query_codellama(prompt)

def get_improvement_recommendations():
    """Get overall improvement recommendations from Llama2"""
    print("💡 Llama2: Generating improvement recommendations...")
    
    prompt = """For a developer working on:
1. AI-powered script generation tools (Python/Bash)
2. React PWA for Raspberry Pi with touch interface
3. Learning portfolio and curriculum

What are the top 5 most valuable improvements they should make to:
- Improve code quality
- Add useful features
- Better documentation
- Enhance user experience

Be specific and practical."""

    return query_llama2(prompt)

def analyze_ai_scripts():
    """Have CodeLlama review the AI script generators"""
    print("🔧 CodeLlama: Reviewing AI script generators...")
    
    try:
        with open('/home/chyort/projects/ai-scripts/clxl2_generator.py', 'r') as f:
            script_code = f.read()[:2000]
    except:
        script_code = "Unable to read file"
    
    prompt = f"""Review this AI script generator code:
{script_code}

Suggest improvements for:
1. Error handling
2. User experience
3. Code organization
4. Additional features

Keep suggestions practical and implementable."""

    return query_codellama(prompt)

def main():
    print("=" * 60)
    print("CLxL2 PROJECT ANALYSIS")
    print("Using Llama2-13B and CodeLlama-13B")
    print("=" * 60)
    print()
    
    # 1. Overall structure analysis
    print("\n" + "="*60)
    print("📁 PROJECT STRUCTURE ANALYSIS")
    print("="*60)
    structure_analysis = analyze_project_structure()
    print(structure_analysis)
    
    # 2. React code analysis
    print("\n" + "="*60)
    print("⚛️ REACT PWA CODE REVIEW")
    print("="*60)
    react_analysis = analyze_raspi5kit_code()
    print(react_analysis)
    
    # 3. AI Scripts analysis
    print("\n" + "="*60)
    print("🤖 AI SCRIPT GENERATOR REVIEW")
    print("="*60)
    ai_scripts_analysis = analyze_ai_scripts()
    print(ai_scripts_analysis)
    
    # 4. Improvement recommendations
    print("\n" + "="*60)
    print("🎯 IMPROVEMENT RECOMMENDATIONS")
    print("="*60)
    recommendations = get_improvement_recommendations()
    print(recommendations)
    
    # Save report
    report_path = "/home/chyort/projects/ai-scripts/CLxL2_PROJECT_ANALYSIS.md"
    with open(report_path, 'w') as f:
        f.write("# CLxL2 Project Analysis Report\n\n")
        f.write(f"Generated: {os.popen('date').read()}\n\n")
        f.write("## Project Structure Analysis\n\n")
        f.write(structure_analysis + "\n\n")
        f.write("## React PWA Code Review\n\n")
        f.write(react_analysis + "\n\n")
        f.write("## AI Script Generator Review\n\n")
        f.write(ai_scripts_analysis + "\n\n")
        f.write("## Improvement Recommendations\n\n")
        f.write(recommendations + "\n")
    
    print("\n" + "="*60)
    print(f"✅ Analysis complete! Report saved to:")
    print(f"   {report_path}")
    print("="*60)

if __name__ == "__main__":
    main()
