package com.phoenix.funding.domain

import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.FieldType
import org.springframework.data.mongodb.core.mapping.MongoId
import java.math.BigDecimal

@Document("funds")
data class Fund(
    @MongoId(FieldType.OBJECT_ID) var id: String? = null,
    val name: String,
    val managerName: String,
    val description: String?,
    val inceptionDate: String,
    val totalValue: BigDecimal,
    val ytdReturnPercentage: Double,
    val createdAt: String,
    val updatedAt: String
)