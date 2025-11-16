package com.phoenix.funding.repository

import com.phoenix.funding.domain.Fund
import org.springframework.data.mongodb.repository.MongoRepository

/**
 * Repository for Funds
 */
interface FundRepository : MongoRepository<Fund, String>