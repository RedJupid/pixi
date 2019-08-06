package com.xd.server;

import lombok.Data;

import java.util.Date;

/**
 * @Author xd
 * @Description
 * @Date 2019/8/6 14:10
 */

@Data
public class Bubble {

    private int x;
    private int y;
    private int power;
    private Date born;

    public void setBorn(Date born) {
        this.born = new Date();
    }

    public Bubble(int x, int y, int power) {
        this.x = x;
        this.y = y;
        this.power = power;
    }
}
