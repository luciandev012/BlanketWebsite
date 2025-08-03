import React from 'react'
import classNames from 'classnames/bind'
import styles from './ViewAll.module.scss'
import { NextArrowIcon } from '../../Icon/Icon'

const cx = classNames.bind(styles)

const ViewAll = ({ text, link }) => {
    return (
        <div className={cx('wrapper')}>
            <a href={link} className={cx('view-all')}>
                {text || 'Xem tất cả'}
                <NextArrowIcon />
            </a>
        </div>
    )
}

export default ViewAll
