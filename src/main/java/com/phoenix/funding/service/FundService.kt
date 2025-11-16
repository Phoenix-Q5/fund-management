package com.phoenix.funding.service

import com.phoenix.funding.domain.Fund
import com.phoenix.funding.exception.FundingException
import com.phoenix.funding.model.FundRequest
import com.phoenix.funding.model.FundResponse
import com.phoenix.funding.repository.FundRepository
import com.phoenix.funding.repository.InvestmentRepository
import org.springframework.stereotype.Service
import java.time.Instant

@Service
class FundService(
    private val fundRepository: FundRepository,
    private val investmentRepository: InvestmentRepository
) {

    fun getAllFunds(): List<FundResponse> =
        fundRepository.findAll().stream().map { it.toResponse() }.toList()

    fun getFund(id: String): FundResponse =
        fundRepository.findById(id)
            .orElseThrow { FundingException("Fund $id not found") }
            .toResponse()

    fun createFund(request: FundRequest): FundResponse {
        val now = Instant.now().toString()
        val fund = Fund(
            name = request.name,
            managerName = request.managerName,
            description = request.description,
            inceptionDate = request.inceptionDate,
            totalValue = request.totalValue,
            ytdReturnPercentage = request.ytdReturnPercentage,
            createdAt = now,
            updatedAt = now
        )
        return fundRepository.save(fund).toResponse()
    }

    fun updateFund(id: String, request: FundRequest): FundResponse {
        val existing = fundRepository.findById(id)
            .orElseThrow { FundingException("Fund $id not found") }

        val updated = existing.copy(
            name = request.name,
            managerName = request.managerName,
            description = request.description,
            inceptionDate = request.inceptionDate,
            totalValue = request.totalValue,
            ytdReturnPercentage = request.ytdReturnPercentage,
            updatedAt = Instant.now().toString()
        )

        return fundRepository.save(updated).toResponse()
    }

    fun deleteFund(id: String) {
        if (!fundRepository.existsById(id)) {
            throw FundingException("Fund $id not found")
        }
        investmentRepository.deleteByFundId(id)
        fundRepository.deleteById(id)
    }

    private fun Fund.toResponse() = FundResponse(
        id = this.id!!,
        name = this.name,
        managerName = this.managerName,
        description = this.description,
        inceptionDate = this.inceptionDate,
        totalValue = this.totalValue,
        ytdReturnPercentage = this.ytdReturnPercentage,
        createdAt = this.createdAt.toString(),
        updatedAt = this.updatedAt.toString()
    )
}