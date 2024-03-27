import os
# get the directory before the current directory
finllm_dir = os.chdir(os.path.dirname(os.getcwd())) + '/FinLLM'
print(finllm_dir)
print(os.getcwd())
