App.InfoModal = React.createClass({

  clickSubmitBusiness (e) {
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
              <h3>A Curated Collection of UT Businesses</h3>
              <p>
                List maintained by <a href='http://utlea.org/' target='_blank'>UT LEA</a>, Interface by <a href='http://hitchcott.com' target='_blank'>Chris Hitchcott</a>
              </p>
            </div>
          </div>

          <div className='divider'></div>

            <div className='row'>
              <div className='col s12 m6'>
              <div className='section'>
                <h4>Status Color Key</h4>
                <p>The background of each Business shows a particular color depending on it&#39;s state:</p>
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
                  <h4>What qualifies as a UT Business?</h4>
                  <p> A UT Business is any initiative taken by a UT student or group of students to develop an idea into a working business model. The business can be a work in progress or just a concept or abandoned years ago.<a href='https://en.wikipedia.org/wiki/Block_chain_(database)' target='_blank'>blockchain</a> and <a href='https://en.wikipedia.org/wiki/Smart_contract' target='_blank'>smart contracts</a>.</p>
                  <p>Most of the projects listed on this page were built using <a href='https://www.ethereum.org' target='_blank'>Ethereum</a> - a popular development platform for creating businesses.</p>
                  <p>If you are a UT student and interested in starting your own business, why not contact somebody from  <a href='https://utlea.org' target='_blank'>UT LEA</a>?</p>
                </div>
                <div className='section'>
                  <h4>Submit / Update your Business</h4>
                  <p>If you have started a Business as a student at UT and would like to have it added to <i>State of UT Businesses</i>, please <a onClick={this.clickSubmitBusiness} ref='submitModal' href='#'>click here to submit it for approval</a>.</p>
                </div>
              </div>
            </div>

        </div>
      </div>
    )
  }

})
