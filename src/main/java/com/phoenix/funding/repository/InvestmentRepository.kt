package com.phoenix.funding.repository

import com.phoenix.funding.domain.Investment
import org.springframework.data.mongodb.repository.MongoRepository

/**
 * Repository for investments
 */
interface InvestmentRepository : MongoRepository<Investment, String> {
    fun findByFundId(fundId: String): List<Investment>
    fun deleteByFundId(fundId: String)
}