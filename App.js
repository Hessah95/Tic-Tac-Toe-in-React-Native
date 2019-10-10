import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Button } from "react-native";
import { MaterialCommunityIcons as Icon } from "react-native-vector-icons";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameState: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
      currentPlayer: 1
    };
  }

  componentDidMount() {
    this.initializeGame();
  }

  initializeGame = () => {
    this.setState({
      gameState: [[0, 0, 0], [0, 0, 0], [0, 0, 0]], // initialize the grid
      currentPlayer: 1 //initialize the player
    });
  };

  renderIcon = (row, col) => {
    var value = this.state.gameState[row][col];
    switch (value) {
      case 1: // in case of the first player
        return <Icon name="close" style={styles.X} />;
      case -1: // in case of the second player
        return <Icon name="circle-outline" style={styles.O} />;
      default:
        // otherwise return nothing
        return <View />;
    }
  };

  onBoxPress = (row, col) => {
    // don't change the choose boxes
    var value = this.state.gameState[row][col];
    if (value !== 0) {
      // if this box already chosen ... do nothing
      return;
    }

    var currentPlayer = this.state.currentPlayer;

    var arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({ gameState: arr });

    // switch to the other player :
    var nextPlayer = currentPlayer == 1 ? -1 : 1;
    this.setState({ currentPlayer: nextPlayer });

    // check for winners
    var winner = this.getWinner();
    if (winner == 1) {
      alert("Player 1 is the winner !");
      this.initializeGame();
    } else if (winner == -1) {
      alert("Player 2 is the winner !");
      this.initializeGame();
    }
  };

  onResetPress = () => {
    this.initializeGame();
  };

  getWinner = () => {
    let number = 3;
    let arr = this.state.gameState;
    let sum;

    // check rows
    for (let i = 0; i < number; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2];
      if (sum === 3) {
        return 1; // the winner is: player 1
      } else if (sum === -3) {
        return -1; // the winner is: player 2
      }
    }

    // check col
    for (let i = 0; i < number; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i];
      if (sum === 3) {
        return 1; // the winner is: player 1
      } else if (sum === -3) {
        return -1; // the winner is: player 2
      }
    }

    // check for diagonals
    sum = arr[0][0] + arr[1][1] + arr[2][2];
    if (sum === 3) {
      return 1; // the winner is: player 1
    } else if (sum === -3) {
      return -1; // the winner is: player 2
    }

    sum = arr[0][2] + arr[1][1] + arr[2][0];
    if (sum === 3) {
      return 1; // the winner is: player 1
    } else if (sum === -3) {
      return -1; // the winner is: player 2
    }

    return 0; // no one win the game yet
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Tic Tac Toe</Text>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => this.onBoxPress(0, 0)}
            style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}
          >
            {this.renderIcon(0, 0)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onBoxPress(0, 1)}
            style={[styles.tile, { borderTopWidth: 0 }]}
          >
            {this.renderIcon(0, 1)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onBoxPress(0, 2)}
            style={[styles.tile, { borderTopWidth: 0, borderRightWidth: 0 }]}
          >
            {this.renderIcon(0, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => this.onBoxPress(1, 0)}
            style={[styles.tile, { borderLeftWidth: 0 }]}
          >
            {this.renderIcon(1, 0)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onBoxPress(1, 1)}
            style={[styles.tile, {}]}
          >
            {this.renderIcon(1, 1)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onBoxPress(1, 2)}
            style={[styles.tile, { borderRightWidth: 0 }]}
          >
            {this.renderIcon(1, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => this.onBoxPress(2, 0)}
            style={[styles.tile, { borderLeftWidth: 0, borderBottomWidth: 0 }]}
          >
            {this.renderIcon(2, 0)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onBoxPress(2, 1)}
            style={[styles.tile, { borderBottomWidth: 0 }]}
          >
            {this.renderIcon(2, 1)}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.onBoxPress(2, 2)}
            style={[
              styles.tile,
              {
                borderRightWidth: 0,
                borderBottomWidth: 0
              }
            ]}
          >
            {this.renderIcon(2, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ paddingTop: 100 }} />
        <Button
          title="Reset The Game"
          color="gray"
          onPress={this.onResetPress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#DCDCE3"
    // borderColor: "white"
  },

  tile: {
    borderWidth: 3,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#B3B6B7"
  },

  X: {
    color: "red",
    fontSize: 65
  },

  O: {
    color: "green",
    fontSize: 65
  },

  title: {
    fontSize: 45,
    fontWeight: "bold",
    paddingBottom: 50,
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 20
  }
});
