package com.xd.server;

import lombok.Data;

/**
 * @Author xd
 * @Description
 * @Date 2019/8/6 14:57
 */
@Data
public class Fire {
    int x;
    int y;
    int type;

    public Fire(int x, int y, int type) {
        this.x = x;
        this.y = y;
        this.type = type;
    }
}
