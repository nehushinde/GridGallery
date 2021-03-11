import React from 'react';
import axios from 'axios';
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      comparisonData: [],
      isTableShow: false,
    };
  }

  componentDidMount() {
    axios({
      url: 'https://jsonplaceholder.typicode.com/photos',
    })
      .then((response) => {
        console.log('Date: ', response.data.slice(0, 50));
        this.setState({photos: response.data.slice(0, 50)});
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  }

  onCompare = (e, item) => {
    const data = this.state.comparisonData;
    if (item.hasOwnProperty('isActive')) {
    } else {
      const found = data.some((el) => el.id === item.id);
      if (!found) {
        this.state.comparisonData.push(item);
      }
    }
  };

  showTable = () => {
    this.setState((currentState) => ({
      isTableShow: !currentState.isTableShow,
    }));
  };

  render() {
    return (
      <div className="container-fluid">
        {this.state.isTableShow ? (
          <React.Fragment>
            <div
              className="row"
              style={{display: 'flex', justifyContent: 'flex-end'}}
            >
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.showTable}
              >
                Photos
              </button>
            </div>
            <div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>ID</th>
                    <th>URL</th>
                    <th>Title</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.photos.length ? (
                    this.state.comparisonData.map((item, i) => {
                      return (
                        <tr key={i}>
                          <th>
                            <img
                              src={item.url}
                              alt={item.title}
                              height="auto"
                              width="50%"
                            />
                          </th>
                          <td>{item.id}</td>
                          <td>{item.url}</td>
                          <td>{item.title}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <div>no data</div>
                  )}
                </tbody>
              </table>
            </div>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div
              className="row"
              style={{display: 'flex', justifyContent: 'flex-end'}}
            >
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.showTable}
              >
                Comparison table
              </button>
            </div>
            <div className="row">
              {this.state.photos.length ? (
                this.state.photos.map((item, i) => {
                  return (
                    <div key={i} className="col-sm-4" style={{padding: '10px'}}>
                      <img
                        src={item.url}
                        alt={item.title}
                        height="auto"
                        width="100%"
                      />
                      <button
                        type="button"
                        className="btn btn-primary"
                        style={{width: '100%'}}
                        onClick={(e) => this.onCompare(e, item)}
                      >
                        Compare
                      </button>
                    </div>
                  );
                })
              ) : (
                <div>no data</div>
              )}
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

export default App;
