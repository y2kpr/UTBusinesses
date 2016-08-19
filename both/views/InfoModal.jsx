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
                <div className='col s12 m6'>
                  <p>Product Status</p>
                  <ul className='color-list'>
                    <li className='truncate grey accent-2'>Abandoned</li>
                    <li className='truncate light-green accent-3'>Live</li>
                    <li className='truncate green accent-2'>Working Prototype</li>
                    <li className='truncate green accent-1'>Demo</li>
                    <li className='truncate amber accent-1'>Concept</li>
                </ul>
                </div>
                <div className='col s12 m6'>
                  <p>Funding Status</p>
                  <ul className='color-list'>
                    <li className='truncate light-green accent-3'>Exited</li>
                    <li className='truncate green accent-2'>Series C</li>
                    <li className='truncate green darken-3'>Series B</li>
                    <li className='truncate lime lighten-3'>Series A</li>
                    <li className='truncate teal lighten-3'>Seed</li>
                    <li className='truncate amber accent-1'>Bootstrapping</li>
                  </ul>
                </div>
                <p>Toggle between product and funding status on the right side of the webpage</p>
              </div>
              </div>
              <div className='col s12 m6'>
                <div className='section'>
                  <h4>What qualifies as a UT Business?</h4>
                  <p> A UT Business is any initiative taken by a UT student or group of students to develop an idea into a working business model. The business can be a work in progress or just a concept or abandoned years ago.</p>
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
