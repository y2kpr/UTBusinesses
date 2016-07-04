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
                <label>Author Name *</label>
              </div>
              <div className='input-field col s12 m6'>
                <input className='validate' name='contact_email' type='email' required maxLength='32'/>
                <label>Author Email *</label>
              </div>
            </div>
            <div className='row slim-row'>
              <div className='input-field col s12 m6'>
                <input name='site' type='text' maxLength='64'/>
                <label>Site URL</label>
              </div>
              <div className='input-field col s12 m6'>
                <input name='reddit' type='text' maxLength='128'/>
                <label>Reddit URL</label>
              </div>
            </div>
            <div className='row slim-row'>
              <div className='input-field col s12 m6'>
                <input name='github' type='text' maxLength='64'/>
                <label>GitHub URL</label>
              </div>
              <div className='input-field col s12 m6'>
                <input name='license' type='text' required maxLength='10'/>
                <label>License *</label>
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
                <select className='browser-default validate' required name='status'>
                  <option value='' defaultValue>Project Status</option>
                  <option value='1. Abandoned'>Abandoned</option>
                  <option value='2. On Hold'>On Hold</option>
                  <option value='3. Stealth Mode'>Stealth Mode</option>
                  <option value='4. Concept'>Concept</option>
                  <option value='5. Work In Progress'>Work In Progress</option>
                  <option value='6. Demo'>Demo</option>
                  <option value='7. Working Prototype'>Working Prototype</option>
                  <option value='8. Live'>Live</option>
                </select>
              </div>
              <div className='input-field col s12 m6'>
                <input ref='antiSpam' className='anti-spam validate' required type='text' maxLength='3'/>
                <label>Anti Spam: 40 + 2 = ?</label>
              </div>
            </div>
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
