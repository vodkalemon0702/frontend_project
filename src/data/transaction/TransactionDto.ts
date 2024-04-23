import {ProductDetailDto} from "../product/ProductDetailDto.ts";

export interface TransactionDto {
    tid:       number;
    buyer_uid: number;
    datetime:  string;
    status:    string;
    total:     number;
    items:     TransactionProductDto[];
}

export interface TransactionProductDto {
    tpid:     number;
    product:  ProductDetailDto;
    quantity: number;
    subTotal: number;
}
