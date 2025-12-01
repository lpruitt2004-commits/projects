```python
#!/usr/bin/env python3
"""Raspberry Pi temperature monitor."""
import os
import time
from datetime import datetime

def read_temp():
    """Reads the current temperature from the sensor and returns it in Celsius."""
    temp = None  # Set to None as a default value
    
    try:
        with open("/sys/bus/w1/devices/28-0000073f64aa/w1_slave") as f:
            text = f.read()
            temp_line = text[text.find("t=") + 2:]
            temp_c = float(temp_line) / 1000
    except IOError:
        print("Could not read temperature from sensor.")
    
    return temp_c

def log_temperature():
    """Logs the current temperature to a file."""
    try:
        with open("/home/pi/temp.log", "a") as f:
            timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
            temp_c = read_temp()
            
            if temp_c is not None:
                line = f"{timestamp}: {temp_c}°C\n"
                f.write(line)
    except IOError:
        print("Could not write to temperature log file.")
    
def main():
    """Main function."""
    # Set the interval between measurements in seconds
    interval = 30
    
    while True:
        try:
            log_temperature()
        except KeyboardInterrupt:
            print("Stopping temperature monitor.")
            break
        
        time.sleep(interval)
    
if __name__ == "__main__":
    main()
```

