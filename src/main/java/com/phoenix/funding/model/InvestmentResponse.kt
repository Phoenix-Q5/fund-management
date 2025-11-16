package com.phoenix.funding.model

import java.math.BigDecimal
import java.time.LocalDate

data class InvestmentResponse(
    val id: String,
    val fundId: String,
    val name: String,
    val assetClass: String,
    val purchaseDate: String,
    val quantity: Double,
    val purchasePricePerUnit: BigDecimal,
    val currentMarketValue: BigDecimal,
    val createdAt: String,
    val updatedAt: String
)