App.Business = React.createClass({
  propTypes: {
    business: React.PropTypes.object.isRequired
  },
  statusColors: [
    'grey darken-2 white-text', // 1. Concept
    'amber accent-1', // 1. Work in Progress
    'green accent-2', // 2. Working Prototype
    'light-green accent-3' // 6. Done
  ],

  productStatusNames:[
  'Concept',
  'Work in progress',
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
    var link = this.props.business.url || this.props.business.github || this.props.business.reddit
    return (
      <div className='col ms12 m4 l3 xl4 xxl1'>
        <div className={'card hoverable business-card ' + statusColor}>
          <img class='card-img-top center-align' src={this.props.business.logo} height='100' width='100' alt='UT Business'/>
          <div className='card-content'>
            <div className='main-section center-align'>
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
              <p className='icon-row center-align'>
                { this.props.business.github &&
                  <a target='_blank' href={this.props.business.name}>
                    {this.props.business.license}
                    <i className='icon-link fa fa-fw fa-github'></i>
                  </a>
                }
                { this.props.business.reddit &&
                  <a target='_blank' href={this.props.business.name}>
                    <i className='icon-link fa fa-fw fa-reddit'></i>
                  </a>
                }
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
