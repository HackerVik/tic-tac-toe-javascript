from flask import Flask, render_template, request

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/game')
def game():
    row_num = int(request.args.get('row-num', 3))
    col_num = int(request.args.get('col-num', 3))
    win_size = int(request.args.get('win-size', 3))
    return render_template('game.html', row_num=row_num, col_num=col_num, win_size=win_size)


if __name__ == '__main__':
    app.run(debug=True)
