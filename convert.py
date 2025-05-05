import pandas as pd

df = pd.read_csv('')

df.to_json('challenges.json', orient='records')
