# CLxL2 AI Scripts

AI-powered script generation and code assistance using Ollama with CodeLlama-13B and Llama2-13B.

## 🚀 Quick Start (Complete Beginner Guide)

### Step 1: Make Sure Ollama is Running

First, check if Ollama is installed and your CLxL2 models are available:

```bash
# Check if Ollama is installed
ollama --version

# Check if your models are installed
ollama list
```

You should see `codellama:13b` and `llama2:13b` in the list. If not, install them:

```bash
ollama pull codellama:13b
ollama pull llama2:13b
```

### Step 2: Navigate to the Scripts Folder

```bash
cd /home/chyort/projects/ai-scripts
```

### Step 3: Try Your First Script Generation!

**Option A: Quick Bash Script (Easiest)**
```bash
./clxl2.sh bash "Print hello world and show the current date"
```

**Option B: Python Script**
```bash
python3 clxl2_generator.py generate "Print hello world and show system info"
```

That's it! CLxL2 will generate a complete script for you. The file will be saved in the current folder with a timestamp.

### Step 4: Run Your Generated Script

```bash
# Find your new script
ls -lt generated_*

# Run it (Python example)
python3 generated_*.py

# Run it (Bash example)
chmod +x generated_*.sh
./generated_*.sh
```

---

## 🤖 Available Tools

### 1. Python Generator (`clxl2_generator.py`)
Full-featured Python script for AI-assisted development.

**Features:**
- Generate scripts from natural language descriptions
- Improve existing scripts
- Explain code functionality
- Uses both CodeLlama and Llama2

**Usage:**
```bash
# Generate a new script
python3 clxl2_generator.py generate "Create a GPIO monitor for Raspberry Pi"

# Improve existing script
python3 clxl2_generator.py improve my_script.py

# Explain what a script does
python3 clxl2_generator.py explain my_script.py
```

### 2. Bash Quick Generator (`clxl2.sh`)
Fast command-line tool for quick script generation.

**Usage:**
```bash
# Make executable
chmod +x clxl2.sh

# Generate bash script
./clxl2.sh bash "Monitor system resources and send alerts"

# Generate Python script
./clxl2.sh python "Parse JSON logs and extract errors"

# Ask a question
./clxl2.sh ask "How do I optimize Raspberry Pi performance?"

# Code review
./clxl2.sh review my_script.sh
```

## 📁 Output Location

All generated scripts are saved to:
```
/home/chyort/projects/ai-scripts/
```

Files are automatically named with timestamps:
- `generated_20251201_143022.py`
- `generated_20251201_143045.sh`
- `my_script_improved.py`

## 🎯 Common Tasks (Beginner Examples)

### Example 1: Your First Script
**Task:** Create a simple script that says hello
```bash
./clxl2.sh python "Create a script that prints 'Hello from CLxL2!' and shows the current time"
```
**What happens:**
- CLxL2 generates a Python script
- Saves it as `generated_TIMESTAMP.py`
- You can run it immediately!

### Example 2: Ask CLxL2 a Question
**Task:** Get help with Raspberry Pi
```bash
./clxl2.sh ask "How do I check the temperature of my Raspberry Pi?"
```
**What happens:**
- Llama2 gives you a detailed answer
- No script generated, just helpful info

### Example 3: Generate a GPIO Control Script
```bash
python3 clxl2_generator.py generate "Create a script to toggle GPIO pins on Raspberry Pi with error handling"
```

### Generate System Monitor
```bash
./clxl2.sh bash "Monitor CPU, memory, and temperature. Log to file and alert if temp > 70°C"
```

### Improve Existing Code
```bash
python3 clxl2_generator.py improve raspi_monitor.py
# Creates: raspi_monitor_improved.py
```

### Get Code Explanation
```bash
python3 clxl2_generator.py explain complex_script.py
```

### Quick Code Review
```bash
./clxl2.sh review my_script.sh
```

## 🔧 Requirements

**What You Need:**
1. **Ollama** - Already installed if you're using CLxL2
2. **CodeLlama-13B** - For generating code
   ```bash
   ollama pull codellama:13b
   ```
3. **Llama2-13B** - For explanations and questions
   ```bash
   ollama pull llama2:13b
   ```
4. **Python 3.6+** - For the Python generator (check: `python3 --version`)

**First Time Setup:**
```bash
# Navigate to the folder
cd /home/chyort/projects/ai-scripts

# Make scripts executable (only needed once)
chmod +x clxl2.sh clxl2_generator.py

# Test if everything works
./clxl2.sh ask "Are you working?"
```

## 💡 Tips

1. **Be Specific**: More detailed descriptions = better scripts
   ```bash
   # Good
   "Create a script that monitors GPIO pin 17, logs state changes to /var/log/gpio.log, and sends notifications via webhook"
   
   # Less ideal
   "Monitor GPIO"
   ```

2. **Iterate**: Generate, review, improve
   ```bash
   python3 clxl2_generator.py generate "Task description"
   python3 clxl2_generator.py improve generated_*.py
   ```

3. **Ask for Help**: Use the ask command
   ```bash
   ./clxl2.sh ask "What's the best way to debounce GPIO inputs on Raspberry Pi?"
   ```

## 📝 Script Types You Can Generate

- **System Monitoring**: CPU, memory, temperature, disk usage
- **GPIO Control**: Pin management, sensor reading, LED control
- **Data Processing**: Log parsing, JSON/CSV manipulation, data analysis
- **Network Tools**: API clients, webhook handlers, network monitors
- **Automation**: Backup scripts, deployment tools, cron jobs
- **File Management**: Batch processing, file organization, backups

## 🚀 Advanced Usage

### Chain Multiple Models
```bash
# Generate with CodeLlama
python3 clxl2_generator.py generate "Your task"

# Get explanation with Llama2
python3 clxl2_generator.py explain generated_*.py

# Improve with CodeLlama
python3 clxl2_generator.py improve generated_*.py
```

### Custom Prompts
Edit the scripts to customize prompts for your specific needs.

## ❓ Troubleshooting

### "Command not found: ollama"
**Problem:** Ollama is not installed
**Solution:**
```bash
# Install Ollama (visit ollama.ai for your OS)
curl https://ollama.ai/install.sh | sh
```

### "Model not found"
**Problem:** You don't have the CLxL2 models yet
**Solution:**
```bash
ollama pull codellama:13b
ollama pull llama2:13b
```

### "Permission denied"
**Problem:** Scripts aren't executable
**Solution:**
```bash
chmod +x clxl2.sh clxl2_generator.py
```

### Generated script doesn't work
**Solution:**
```bash
# Ask CLxL2 to improve it
python3 clxl2_generator.py improve generated_YOURFILE.py

# Or ask CLxL2 to explain what went wrong
python3 clxl2_generator.py explain generated_YOURFILE.py
```

## 📚 Finding Your Generated Scripts

All your scripts are saved here:
```bash
# List all generated scripts
ls -lah /home/chyort/projects/ai-scripts/

# List newest first
ls -lt /home/chyort/projects/ai-scripts/generated_*

# Search for specific scripts
ls -lh /home/chyort/projects/ai-scripts/*gpio*
```

## 🎨 Integration with PWA

Generated scripts can be integrated into your Raspberry Pi Kit PWA:
1. Generate GPIO control scripts
2. Create API endpoints
3. Add to the Scripts section in the PWA

## 📖 Understanding CLxL2

**What is CLxL2?**
CLxL2 is your AI coding team made up of two models:
- **CodeLlama-13B**: The coding expert - writes and improves code
- **Llama2-13B**: The explainer - answers questions and explains code

**Which Tool Should I Use?**

| Task | Use This | Example |
|------|----------|---------|
| Generate quick bash script | `clxl2.sh bash` | `./clxl2.sh bash "backup my files"` |
| Generate Python script | `clxl2.sh python` or `clxl2_generator.py` | `./clxl2.sh python "monitor CPU"` |
| Ask a question | `clxl2.sh ask` | `./clxl2.sh ask "How does GPIO work?"` |
| Improve existing code | `clxl2_generator.py improve` | `python3 clxl2_generator.py improve old.py` |
| Understand a script | `clxl2_generator.py explain` | `python3 clxl2_generator.py explain script.py` |
| Review code quality | `clxl2.sh review` | `./clxl2.sh review my_code.sh` |

## 🎓 Learning Path

**Day 1: Start Simple**
```bash
./clxl2.sh ask "What is Python?"
./clxl2.sh python "Print hello world"
```

**Day 2: Try Something Useful**
```bash
./clxl2.sh bash "Show disk space usage"
python3 clxl2_generator.py generate "Monitor Raspberry Pi temperature"
```

**Day 3: Improve Your Code**
```bash
python3 clxl2_generator.py improve generated_*.py
python3 clxl2_generator.py explain generated_*_improved.py
```

**Week 2: Build Something Cool**
```bash
./clxl2.sh python "Create a GPIO LED controller with command line arguments"
```

---

**Powered by CLxL2** 🤖
*CodeLlama-13B + Llama2-13B via Ollama*

**Need Help?** Run: `./clxl2.sh ask "How do I use CLxL2?"` 😊
