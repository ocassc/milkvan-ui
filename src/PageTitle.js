import React from 'react'
import { NavLink } from 'react-router-dom'
import { Col, Row } from 'antd'

export const PageTitle = props => {
  return (
    <div className="" style={{}}>
      <Row style={{}} type="flex">
        <Col xs={24} sm={15} md={15} lg={15} xl={15}>
          {props.backLink && (
            <NavLink to={props.backLink} className="backLink" title="Back">
              &larr;
            </NavLink>
          )}
          <h1 style={{}} className="page-title">
            {props.title}
            {props.status && (
              <span className="status status-Ongoing" style={{ marginLeft: '5px' }}>
                {props.status}
              </span>
            )}
            <span>{props.children}</span>
          </h1>
        </Col>
        <Col xs={24} sm={9} md={9} lg={9} xl={9} style={{ textAlign: 'right' }}>
          <span className="page-title-right ">{props.titleRight}</span>
        </Col>
      </Row>
      <div style={{ clear: 'both' }}></div>
    </div>
  )
}
