package com.cooking.service.utility;

public abstract class Pagination<T, tT> {
    public abstract tT pagination(T data, int pageNum, int pageSize);
}