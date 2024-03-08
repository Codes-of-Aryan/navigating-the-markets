import os
import re
import csv
import math
import time
import json
import random
import finnhub
import pandas as pd
import yfinance as yf
import datetime
from collections import defaultdict
import data_preparation
import prompt_generation
from openai import OpenAI



#data_preparation.prepare_data_for_company('AAPL', with_basics=True)
#user_prompt = prompt_generation.get_prompt('AAPL')
#system_prompt = f.open('system_prompt.txt', 'r').read()


# client = OpenAI()

# completion = client.chat.completions.create(
#     model="gpt-3.5-turbo",
#     messages=[
#         {"role": "system", "content": system_prompt},
#         {"role": "user", "content": user_prompt}
#     ]
# )
response = open('sample_response.txt', 'r').read()
print(response)