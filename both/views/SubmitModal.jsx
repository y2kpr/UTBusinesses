App.SubmitModal = React.createClass({

  handleSubmit (e) {
    e.preventDefault()
    if (this.refs.antiSpam.getDOMNode().value !== '42') {
      window.alert('You failed the spam filter test.')
    } else {
      var dataObj = {}
      var $thisForm = $(this.refs.submissionForm.getDOMNode())
      $thisForm.serializeArray().forEach((item, i) => {
        dataObj[item.name] = item.value
      })
      Meteor.call('newSubmission', dataObj, (err) => {
        if (err) {
          window.alert(err)
        } else {
          window.alert('Thank you. Your submission will be reviewed.')
          $thisForm[0].reset()
          $(this.getDOMNode()).closeModal()
        }
      })
    }
  },

  componentDidMount () {
    $('input', this.refs.submissionForm.getDOMNode()).each(function () {
      var $this = $(this)
      $this.attr('length', $this.attr('maxlength')).characterCounter()
    })
  },

  render () {
    // Rendering the submit a D-app form
    return (
      <div id='submitModal' className='modal'>
        <div className='modal-content'>
          <div className='row slim-row center-align'>
            <h4>Submit a Business</h4>
            <p>
              Complete the form below or email <a href='mailto:zakkeener@gmail.com' target='_blank'>zakkeener@gmail.com</a>
            </p>
          </div>
          <form ref='submissionForm' onSubmit={this.handleSubmit}>
            <div className='row slim-row'>
              <div className='input-field col s12 m6'>
                <input className='validate' name='business_name' type='text' required maxLength='32'/>
                <label>Business Name *</label>
              </div>
              <div className='input-field col s12 m6'>
                <input className='validate' name='description' type='text' required maxLength='64'/>
                <label>Business Description *</label>
              </div>
            </div>
            <div className='row slim-row'>
              <div className='input-field col s12 m6'>
                <input className='validate' name='contact' type='text' required maxLength='32'/>
                <label>Contact Name *</label>
              </div>
              <div className='input-field col s12 m6'>
                <input className='validate' name='contact_email' type='email' required maxLength='32'/>
                <label>Contact Email *</label>
              </div>
            </div>
            <div className='row slim-row'>
              <div className='input-field col s12 m6'>
                <input name='site' type='text' maxLength='64'/>
                <label>Site URL</label>
              </div>
              <div className='input-field col s12 m6'>
                <input name='logo' type='text' maxLength='128'/>
                <label>Logo (image address)</label>
              </div>
            </div>
            <div className='row slim-row'>
              <div className='input-field col s12 m6'>
                <input name='founders' type='text' maxLength='64'/>
                <label>Founder(s)</label>
              </div>
              <div className='input-field col s12 m6'>
                <input name='founding_date' type='text' required maxLength='10'
                data-fv-date="true"
                data-fv-date-format="MM/DD/YYYY"
                data-fv-date-message="The value is not a valid date" />
                <label>Founding Date (MM/DD/YYYY)*</label>
              </div>
            </div>
            <div className='row slim-row'>
              <div className='input-field col s12'>
                <input name='tags' type='text' maxLength='128'/>
                <label>Tags (comma seperated)</label>
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s12 m6'>
                <select className='browser-default validate' required name='product_status'>
                  <option value='' defaultValue>Product Status</option>
                  <option value='1. Abandoned'>Concept</option>
                  <option value='2. On Hold'>Work in Progress</option>
                  <option value='3. Stealth Mode'>Working Prototype</option>
                  <option value='4. Concept'>Live</option>
                </select>
              </div>
              <div className='input-field col s12 m6'>
                <input ref='antiSpam' className='anti-spam validate' required type='text' maxLength='3'/>
                <label>Anti Spam: 40 + 2 = ?</label>
              </div>
            </div>
            <div className='row'>
              <div className='input-field col s12 m6'>
                <select className='browser-default validate' required name='funding_status'>
                  <option value='' defaultValue>Funding Status</option>
                  <option value='1. Bootstrapping'>Bootstrapping</option>
                  <option value='2. Series A'>Series A</option>
                  <option value='3. Series B'>Series B</option>
                  <option value='4. Series c'>Series C</option>
                  <option value='5. Done'>Done</option>
                </select>
              </div>
              <div className='input-field col s12 m6'>
                <input name='hiring_status' type='checkbox' value='off'/>
                <label>
                   check if you are hiring
                </label>
              </div>
            </div>0
            <div className='row center-align slim-row'>
              <a href='#' className='modal-action modal-close waves-effect waves-green btn-flat'>Cancel</a>
              &nbsp;&nbsp;
              <button type='submit' className='waves-effect waves-blue btn light-blue'>Submit</button>
            </div>
          </form>
        </div>
      </div>
    )
  }

})
