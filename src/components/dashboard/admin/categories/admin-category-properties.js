import React from 'react'
import { Col, Row } from 'react-bootstrap';
import CategoryPropertyKey from './category-property-key';
import CategoryPropertyList from './category-property-list';
import './admin-category-properties.scss'

const AdminCategoryProperties = ({ categoryId }) => {

    return (
        <>
            <div className="admin-category-properties-container">
                <Row style={{ margin: "0" }}>
                    <Col xs={12} xl={4} className="properties-section property-list">
                        <CategoryPropertyList categoryId={categoryId} />
                    </Col>
                    <Col xs={12} xl={8} className="properties-section property-details">
                        <CategoryPropertyKey categoryId={categoryId} />
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default AdminCategoryProperties