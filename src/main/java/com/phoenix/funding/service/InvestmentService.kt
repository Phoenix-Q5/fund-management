package com.phoenix.funding.service

import com.phoenix.funding.domain.Investment
import com.phoenix.funding.exception.FundingException
import com.phoenix.funding.model.InvestmentRequest
import com.phoenix.funding.model.InvestmentResponse
import com.phoenix.funding.repository.FundRepository
import com.phoenix.funding.repository.InvestmentRepository
import org.springframework.stereotype.Service
import java.time.Instant

@Service
class InvestmentService(
    private val investmentRepository: InvestmentRepository,
    private val fundRepository: FundRepository
) {

    fun getInvestmentsForFund(fundId: String): List<InvestmentResponse> {
        ensureFundExists(fundId)
        return investmentRepository.findByFundId(fundId).stream().map { it.toResponse() }.toList()
    }

    fun getInvestment(investmentId: String): InvestmentResponse =
        investmentRepository.findById(investmentId)
            .orElseThrow { FundingException("Investment $investmentId not found") }
            .toResponse()

    fun createInvestment(fundId: String, request: InvestmentRequest): InvestmentResponse {
        ensureFundExists(fundId)
        val now = Instant.now().toString()
        val investment = Investment(
            fundId = fundId,
            name = request.name,
            assetClass = request.assetClass,
            purchaseDate = request.purchaseDate,
            quantity = request.quantity,
            purchasePricePerUnit = request.purchasePricePerUnit,
            currentMarketValue = request.currentMarketValue,
            createdAt = now,
            updatedAt = now
        )
        return investmentRepository.save(investment).toResponse()
    }

    fun updateInvestment(investmentId: String, request: InvestmentRequest): InvestmentResponse {
        val existing = investmentRepository.findById(investmentId)
            .orElseThrow { FundingException("Investment $investmentId not found") }

        val updated = existing.copy(
            name = request.name,
            assetClass = request.assetClass,
            purchaseDate = request.purchaseDate,
            quantity = request.quantity,
            purchasePricePerUnit = request.purchasePricePerUnit,
            currentMarketValue = request.currentMarketValue,
            updatedAt = Instant.now().toString()
        )
        return investmentRepository.save(updated).toResponse()
    }

    fun deleteInvestment(investmentId: String) {
        if (!investmentRepository.existsById(investmentId)) {
            throw FundingException("Investment $investmentId not found")
        }
        investmentRepository.deleteById(investmentId)
    }

    private fun ensureFundExists(fundId: String) {
        if (!fundRepository.existsById(fundId)) {
            throw FundingException("Fund $fundId not found")
        }
    }

    private fun Investment.toResponse() = InvestmentResponse(
        id = this.id!!,
        fundId = this.fundId,
        name = this.name,
        assetClass = this.assetClass,
        purchaseDate = this.purchaseDate,
        quantity = this.quantity,
        purchasePricePerUnit = this.purchasePricePerUnit,
        currentMarketValue = this.currentMarketValue,
        createdAt = this.createdAt.toString(),
        updatedAt = this.updatedAt.toString()
    )
}