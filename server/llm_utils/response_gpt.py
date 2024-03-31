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
from .data_preparation import *
import data_preparation as dp
from .prompt_generation import *
import prompt_generation as pg
from openai import OpenAI

# Get the directory path of the current script
current_dir = os.path.dirname(os.path.abspath(__file__))


def get_response(company):
    # data_preparation.prepare_data_for_company('AAPL', with_basics=True)
    # user_prompt = prompt_generation.get_prompt('AAPL')
    # system_prompt = f.open('system_prompt.txt', 'r').read()

    # client = OpenAI()

    # completion = client.chat.completions.create(
    #     model="gpt-3.5-turbo",
    #     messages=[
    #         {"role": "system", "content": system_prompt},
    #         {"role": "user", "content": user_prompt}
    #     ]
    # )
    # Construct the file path relative to the current directory
    file_path = os.path.join(current_dir, 'sample_response.txt')
    response = open(file_path, 'r').read()
    # response = open('sample_response.txt', 'r').read()
    return response


# print(get_response('AAPL'))
