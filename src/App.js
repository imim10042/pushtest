import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';

class App extends Component {
    constructor(props) {
      super(props);
      this.addClick = this.addClick.bind(this)
        this.state = {
          name: ['aさん','bさん','cさん'],
          count: [10,20,30],
          addName: '',
        };
    }

    // +ボタン押下で呼び出されるメソッド
    addClick(i) {
      // 新しい配列を生成してcountに代入
      let count = this.state.count.slice();

      // カウントアップした値で要素を更新
      count[i] = count[i] + 1;
//      count.splice(i,1,count[i] + 1);

      // Stateのcountに更新した配列を設定する
      // ⇒ 配列が更新されたため再レンダリング
      this.setState({count});
    }

    // -ボタン押下で呼び出されるメソッド
    subClick(i) {
      let count = this.state.count.slice();
      count.splice(i,1,count[i] - 1);
      this.setState({
        count: count
      });
    }

    // 追加ボタン押下で呼び出されるメソッド
    addPerson(e) {
      console.log('a');
      e.preventDefault();

      const addName = this.addName.value;

      // // 新しい配列を生成してname,countに代入
      let name = this.state.name.slice();
      let count = this.state.count.slice();

      name.push(addName);
      count.push(0);

      this.setState({name,count});

      this.addName.value = '';

    }

    renderLine() {
      const items = [];
      const style = {margin: 12,};

      for (let i = 0; i < this.state.name.length; i++){
        items.push(
          <div>
            <span>{this.state.name[i]}</span>
            <MuiThemeProvider>
              <RaisedButton label="+" primary={true} style={style} onClick={() => {this.addClick(i)}} />
              <RaisedButton label="-" secondary={true} style={style} onClick={() => {this.subClick(i)}} />
            </MuiThemeProvider>
            <span>{this.state.count[i]}</span>
          </div>
        )
      }
      return items
    }

    addName = null

    render() {
        return (
          <div>
            {this.renderLine()}

            <form onSubmit={event => this.addPerson(event)}>
              <input type="text" ref={el => this.addName = el} cols="15" rows="1"></input>
              <input type="submit" value="追加"></input>
            </form>

          </div>
        );
    }
}

//<button onClick={() => {this.subClick(i)}}>-</button>

export default App;
