# navigating-the-markets

# Instructions to Run

**Note: Node should be installed in your machine before proceeding!**

- Step 1: Navigate to client-v1 and run the following commands:

```bash
cd client-v1
npm install
npm start
```

- Step 2: Navigate to stock-forecasting-server and run the following commands:

```bash
cd ../stock-forecasting-server
npm install -g serve
serve -l 8000
```

## Alternate

If you want to run the whole application in one go, first you need to setup and install necessary libraries. This can be
done by running following commands from root directory.

```bash
cd client-v1
npm install
```

And

```bash
cd ../stock-forecasting-server
npm install -g serve
```

Once you have done this step, then in future, run the following command in root directory.

```bash
./run.sh
```

**Note:** This command may not run initially because of file executable permissions. So if it doesn't run, run this command first in the root directory and the run run.sh file again.

```bash
chmod +x run.sh
```

python3 -m flask --app server.py run
