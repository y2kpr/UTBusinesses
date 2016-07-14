App.Business = React.createClass({
  propTypes: {
    business: React.PropTypes.object.isRequired
  },
  statusColors: [
    'light-grey', // 0. Unknown
    'black white-text', // 1. Abandoned
    'red darken-2 white-text', // 2. On Hold
    'grey darken-2 white-text', // 3. Stealth Mode
    'amber accent-1', // 4. Concept
    'amber', // 5. Work In Progress
    'green accent-1', // 6. Demo
    'green accent-2', // 7. Working Prototype
    'light-green accent-3' // 8. live
  ],

  render () {
    var statusColor = this.statusColors[parseInt(this.props.business.status[0], 10)]
    var link = this.props.business.url || this.props.business.github || this.props.business.reddit
    return (
      <div className='col ms12 m4 l3 xl2 xxl1'>
        <div className={'card hoverable business-card ' + statusColor}>
          <div className='card-content'>
            <div className='main-section center-align'>
              <div className='card-title truncate'>
                {link ? <a target='_blank' href={link}>{this.props.business.name}</a>
                : this.props.business.name}
              </div>
              <div className='card-subtitle trunchate'>
                {this.props.business.contact}
              </div>
              <div className='card-description'>
                <p>{this.props.business.description}</p>
              </div>
            </div>
            <div className='section status-section'>
              <p className='icon-row center-align'>
                { this.props.business.github &&
                  <a target='_blank' href={this.props.business.github}>
                    {this.props.business.license}
                    <i className='icon-link fa fa-fw fa-github'></i>
                  </a>
                }
                { this.props.business.reddit &&
                  <a target='_blank' href={this.props.business.reddit}>
                    <i className='icon-link fa fa-fw fa-reddit'></i>
                  </a>
                }
              </p>
              <p className='pull-right'>
                  {this.props.business.last_update}
              </p>
              <p className='status truncate'>
                {this.props.business.status.substring(3)}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
})
