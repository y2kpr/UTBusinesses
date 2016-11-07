App.Business = React.createClass({
  propTypes: {
    business: React.PropTypes.object.isRequired
  },
  productStatusColors: [
    'red-1', // 1. Abandoned    
    'yellow-1', // 2. Concept
    'med2-green', // 3. Working Prototype    
    'dark-green', // 4. Live
  ],

  fundingStatusColors: [
    'red-1',  // 1. Not Applicable
    'yellow-1', // 2. Bootstrapping
    'light-green', // 3. Seed
    'med1-green', // 4. Series A
    'med2-green', // 5. Series B
    'med3-green', // 6. Series C
    'dark-green', // 7. Exited
    ],

  productStatusNames:[
  'Abandoned',  
  'Concept',
  'Working prototype',
  'Live'
  ],

  fundingStatusNames:[
  'Not Applicable',
  'Bootstrapping',
  'Seed',
  'Series A',
  'Series B',
  'Series C',
  'Exited'
  ],

  render () {
    var statusColor = Session.equals("searchSortType", "funding_status") ? this.fundingStatusColors[parseInt(this.props.business.funding_status[0], 10) - 1] : this.productStatusColors[parseInt(this.props.business.product_status[0], 10) - 1]
    var statusName = Session.equals("searchSortType", "funding_status") ? this.fundingStatusNames[parseInt(this.props.business.funding_status[0], 10) - 1] : this.productStatusNames[parseInt(this.props.business.product_status[0], 10) - 1]
    var textColor = statusColor == 'dark-green' ? 'white-text' : 'black-text'
    var link = this.props.business.url
    var contact = "mailto:" + this.props.business.contact
    return (
      <div className='col ms12 m4 l3 xl4 xxl1'>
        <div className={'card hoverable business-card ' + statusColor + ' ' + textColor}>
          <div className='card-content'>
            <div className='main-section center-align'>
              <img class='card-img-top center-align' src={this.props.business.logo} height='100' width='100' alt='No Logo Available'/>
              <div className='card-title truncate'>
                {link ? <a target='_blank' href={link}>{this.props.business.name}</a>
                : this.props.business.name}
              </div>
              <div className='card-subtitle trunchate'>
                {this.props.business.description}
              </div>
              <div className='card-description'>
                <p>Founder(s): {this.props.business.founder}</p>
              </div>
            </div>
            <div className='section status-section'>
              <p className='center-align'>
                {this.props.business.hiring_status.includes("0") ? "not hiring" : "is hiring"}
              </p>
              <p className='status truncate center-align'>
                <a href={contact}>Contact</a>
              </p>
              <p className='pull-right'>
                  {this.props.business.founding_date}
              </p>
              <p className='status truncate'>
                {statusName}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
