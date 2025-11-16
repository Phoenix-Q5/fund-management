package com.phoenix.funding.model

import java.math.BigDecimal
import java.time.LocalDate

data class FundRequest (
    val name: String,
    val managerName: String,
    val description: String?,
    val inceptionDate: String,
    val totalValue: BigDecimal,
    val ytdReturnPercentage: Double
)