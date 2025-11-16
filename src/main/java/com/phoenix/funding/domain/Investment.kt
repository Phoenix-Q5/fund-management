package com.phoenix.funding.domain

import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.FieldType
import org.springframework.data.mongodb.core.mapping.MongoId
import java.math.BigDecimal

@Document("investments")
data class Investment(
    @MongoId(FieldType.OBJECT_ID) var id: String? = null,
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