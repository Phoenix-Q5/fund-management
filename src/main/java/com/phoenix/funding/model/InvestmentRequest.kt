package com.phoenix.funding.model

import java.math.BigDecimal
import java.time.LocalDate

data class InvestmentRequest (
    val name: String,
    val assetClass: String,
    val purchaseDate: String,
    val quantity: Double,
    val purchasePricePerUnit: BigDecimal,
    val currentMarketValue: BigDecimal
)