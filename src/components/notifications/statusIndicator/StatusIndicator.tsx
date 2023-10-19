import React from 'react'

function StatusIndicator({ status, pending, fulfilled, rejected, ...props }) {
  switch (status) {
    case 'pending':
      return pending || null
    case 'fulfilled':
      return fulfilled ? React.cloneElement(fulfilled, props) : null
    case 'rejected':
      return rejected ? React.cloneElement(rejected, props) : null
    default:
      return null // Return nothing by default
  }
}

export default StatusIndicator
