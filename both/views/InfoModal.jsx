App.InfoModal = React.createClass({

  clickSubmitDapp (e) {
    e.preventDefault()
    $('#infoModal').closeModal({
      complete: function () {
        $('#submitModal').openModal()
      }
    })
  },

  render () {
    return (
      <div id='infoModal' className='modal'>
        <div className='modal-content'>
           <div className='section'>

            <div className='row center-align'>
              <h3>A Curated Collection of Decentralized Apps</h3>
              <p>
                List maintained by <a href='http://ethercasts.com/' target='_blank'>EtherCasts</a>, Interface by <a href='http://hitchcott.com' target='_blank'>Chris Hitchcott</a>
              </p>
            </div>
          </div>

          <div className='divider'></div>

            <div className='row'>
              <div className='col s12 m6'>
              <div className='section'>
                <h4>Status Color Key</h4>
                <p>The background of each Dapp shows a particular color depending on it&#39;s state:</p>
                <ul className='color-list'>
                  <li className='truncate light-green accent-3'>Live</li>
                  <li className='truncate green accent-2'>Working Prototype</li>
                  <li className='truncate green accent-1'>Demo</li>
                  <li className='truncate amber'>Work In Progress</li>
                  <li className='truncate amber accent-1'>Concept</li>
                  <li className='truncate grey darken-2 white-text'>Stealth Mode</li>
                  <li className='truncate red darken-2 white-text'>On Hold</li>
                  <li className='truncate black white-text'>Abandoned</li>
                  <li className='truncate light-grey'>Unknown</li>
                </ul>
                </div>
              </div>
              <div className='col s12 m6'>
                <div className='section'>
                  <h4>What is a Dapp?</h4>
                  <p>A Decentralized Application (or 'Dapp') is a piece of software consisting of a user interface (UI) and a decentralized backend; typically making use of a <a href='https://en.wikipedia.org/wiki/Block_chain_(database)' target='_blank'>blockchain</a> and <a href='https://en.wikipedia.org/wiki/Smart_contract' target='_blank'>smart contracts</a>.</p>
                  <p>Most of the projects listed on this page were built using <a href='https://www.ethereum.org' target='_blank'>Ethereum</a> - a popular development platform for creating dapps.</p>
                  <p>To learn more about creating dapps, why not subscribe to the <a href='https://www.youtube.com/user/EtherCasts' target='_blank'>EtherCasts YouTube Channel</a>?</p>
                </div>
                <div className='section'>
                  <h4>Submit / Update your Dapp</h4>
                  <p>If you have authored a Dapp and would like to have it added to <i>State of the Dapps</i>, please <a onClick={this.clickSubmitDapp} ref='submitModal' href='#'>click here to submit it for approval</a>.</p>
                </div>
              </div>
            </div>

        </div>
      </div>
    )
  }

})
