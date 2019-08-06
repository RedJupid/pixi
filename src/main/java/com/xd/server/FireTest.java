package com.xd.server;

import java.util.LinkedList;
import java.util.List;

/**
 * @Author xd
 * @Description
 * @Date 2019/8/6 11:57
 */
public class FireTest {

    Bubble[][] bubbles = new Bubble[13][15];

    public static void main(String[] args) {

        FireTest t = new FireTest();
        t.add(new Bubble(6,4,3));
        t.add(new Bubble(8,4,3));
        List<Fire> fires = t.move(new Bubble(6, 4, 3));
        for (Fire fire:fires){
            System.out.println(fire.getX()+","+fire.getY()+","+fire.getType());
        }

    }

    public synchronized void add(Bubble bubble){
        int i = bubble.getY();
        int j = bubble.getX();
        if (bubbles[i][j]==null){
            bubbles[i][j] = bubble;
        }
    }

    public synchronized List<Fire> move(Bubble bubble){
        List<Fire> fires = new LinkedList<>();
        boolean f[][] = new boolean[13][15];
        rec(bubble,fires,f,1);
        return fires;
    }

    public void rec(Bubble bubble,List<Fire> fires,boolean [][] f,int direction){
        int x = bubble.getX();
        int y = bubble.getY();
        int power = bubble.getPower();
        fires.add(new Fire(x,y,1));
        bubbles[y][x] = null;
        for (int k=0,i=y-1,j=x; k<power; k++,i--){
            if (direction==2){
                break;
            }
            if (bubbles[i][j]!=null){
                rec(bubbles[i][j],fires,f,4);
            }else if (f[i][j]==false){
                fires.add(new Fire(j,i,2));
                f[i][j]=true;
            }
        }
        for (int k=0,i=y,j=x+1; k<power; k++,j++){
            if (direction==3){
                break;
            }
            if (bubbles[i][j]!=null){
                rec(bubbles[i][j],fires,f,5);
            }else if (f[i][j]==false){
                fires.add(new Fire(j,i,3));
                f[i][j]=true;
            }
        }
        for (int k=0,i=y+1,j=x; k<power; k++,i++){
            if (direction==4){
                break;
            }
            if (bubbles[i][j]!=null){
                rec(bubbles[i][j],fires,f,2);
            }else if (f[i][j]==false){
                fires.add(new Fire(j,i,4));
                f[i][j]=true;
            }
        }
        for (int k=0,i=y,j=x-1; k<power; k++,j--){
            if (direction==5){
                break;
            }
            if (bubbles[i][j]!=null){
                rec(bubbles[i][j],fires,f,3);
            }else if (f[i][j]==false){
                fires.add(new Fire(j,i,5));
                f[i][j]=true;
            }
        }
    }
}
