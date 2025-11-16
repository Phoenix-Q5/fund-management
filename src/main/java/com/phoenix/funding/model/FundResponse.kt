package com.phoenix.funding.model

import java.math.BigDecimal
import java.time.LocalDate

data class FundResponse(
    val id: String,
    val name: String,
    val managerName: String,
    val description: String?,
    val inceptionDate: String,
    val totalValue: BigDecimal,
    val ytdReturnPercentage: Double,
    val createdAt: String,
    val updatedAt: String
)