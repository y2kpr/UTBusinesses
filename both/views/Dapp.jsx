App.Business = React.createClass({
  propTypes: {
    business: React.PropTypes.object.isRequired
  },
  statusColors: [
    'amber accent-1', // 1. Concept
    'green accent-2', // 2. Working Prototype
    'light-green accent-3' // 3. Live
  ],

  productStatusNames:[
  'Concept',
  'Working prototype',
  'Live'
  ],

  fundingStatusNames:[
  'Bootstrapping',
  'Series A',
  'Series B',
  'Series C',
  'Done'
  ],

  render () {
    var statusColor = this.statusColors[parseInt(this.props.business.product_status[0], 10) - 1]
    var statusName = this.productStatusNames[parseInt(this.props.business.product_status[0], 10) - 1]
    var link = this.props.business.url
    var contact = "mailto:" + this.props.business.contact
    return (
      <div className='col ms12 m4 l3 xl4 xxl1'>
        <div className={'card hoverable business-card ' + statusColor}>
          <div className='card-content'>
            <div className='main-section center-align'>
              <img class='card-img-top center-align' src={this.props.business.logo} height='100' width='100' alt='UT Business'/>
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
                {this.props.business.hiring_status == '0' ? "not hiring" : "is hiring"}
                
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
